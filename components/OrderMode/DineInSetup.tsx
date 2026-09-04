"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getNearbyBranches } from "@/services/branches";
import { getCurrentLocation } from "@/services/location";

import type { NearbyBranch } from "@/types/branch";

import styles from "./DineInSetup.module.css";

type LocationState =
  | "idle"
  | "locating"
  | "success"
  | "error";

export default function DineInSetup() {
  const router = useRouter();
  const [locationState, setLocationState] =
    useState<LocationState>("idle");

  const [errorMessage, setErrorMessage] = useState("");

  const [nearbyBranches, setNearbyBranches] = useState<
    NearbyBranch[]
  >([]);

  const [selectedBranch, setSelectedBranch] =
  useState<NearbyBranch | null>(null);

  const handleFindNearbyShops = async () => {
    setLocationState("locating");
    setErrorMessage("");

    try {
      const location = await getCurrentLocation();

      const branches = getNearbyBranches(location);

      setNearbyBranches(branches);
      setLocationState("success");
    } catch (error) {
      setLocationState("error");

      if (
        error instanceof GeolocationPositionError
      ) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setErrorMessage(
              "Location permission was denied. Please allow location access or choose a shop manually.",
            );
            break;

          case error.POSITION_UNAVAILABLE:
            setErrorMessage(
              "We couldn't determine your location. Please try again or choose a shop manually.",
            );
            break;

          case error.TIMEOUT:
            setErrorMessage(
              "Finding your location took too long. Please try again.",
            );
            break;

          default:
            setErrorMessage(
              "Something went wrong while finding your location.",
            );
        }
      } else {
        setErrorMessage(
          "Something went wrong while finding your location.",
        );
      }
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={styles.icon} aria-hidden="true">
          🍽️
        </div>

        <p className={styles.eyebrow}>DINE-IN</p>

        <h1 className={styles.title}>
          Dine at Plattino Hub
        </h1>

        <p className={styles.description}>
          Find the Plattino Hub you&apos;re dining at to view
          the available menu.
        </p>

        <button
          type="button"
          className={styles.locationButton}
          onClick={handleFindNearbyShops}
          disabled={locationState === "locating"}
        >
          <span aria-hidden="true">
            {locationState === "locating" ? "⏳" : "📍"}
          </span>

          {locationState === "locating"
            ? "Finding nearby shops..."
            : "Find Nearby Shops"}
        </button>

        {locationState === "error" && (
          <p className={styles.error} role="alert">
            {errorMessage}
          </p>
        )}

        {nearbyBranches.length > 0 && (
  <div className={styles.branchList}>
    <p className={styles.branchHeading}>
      Nearby Plattino Hub
    </p>

    {nearbyBranches.map((branch) => {
      const isSelected =
        selectedBranch?.id === branch.id;

      return (
        <button
          key={branch.id}
          type="button"
          className={`${styles.branch} ${
            isSelected ? styles.branchSelected : ""
          }`}
          onClick={() => {
            if (branch.isOpen) {
              setSelectedBranch(branch);
            }
          }}
          disabled={!branch.isOpen}
          aria-pressed={isSelected}
        >
          <div className={styles.branchInfo}>
            <p className={styles.branchName}>
              {branch.name}
            </p>

            <p className={styles.branchAddress}>
              {branch.address}
            </p>

            <p className={styles.branchDistance}>
              {branch.distance < 1
                ? `${Math.round(
                    branch.distance * 1000,
                  )} m away`
                : `${branch.distance.toFixed(1)} km away`}
            </p>
          </div>

          <span
            className={
              branch.isOpen
                ? styles.open
                : styles.closed
            }
          >
            {branch.isOpen ? "OPEN" : "CLOSED"}
          </span>

          {isSelected && (
            <span
              className={styles.selectedIndicator}
              aria-hidden="true"
            >
              ✓
            </span>
          )}
        </button>
      );
    })}
  </div>
)}

{selectedBranch && (
  <button
    type="button"
    className={styles.continueButton}
    onClick={() => {
      router.push(
        `/order?mode=dine_in&branchId=${selectedBranch.id}`,
      );
    }}
  >
    Continue with {selectedBranch.name}
    <span aria-hidden="true">→</span>
  </button>
)}

        {locationState === "error" ||
        nearbyBranches.length === 0 ? (
          <button
            type="button"
            className={styles.manualButton}
          >
            Choose a shop manually
          </button>
        ) : null}
      </section>
    </main>
  );
}