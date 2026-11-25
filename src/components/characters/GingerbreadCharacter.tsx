
"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import Image from "next/image";
import "../animations/gingerbread-animations.css";

type AnimationType = "idle" | "dance";

type GingerbreadCharacterProps = {
  variant: "boy" | "girl";
  name: string;
  animation?: AnimationType;
};

type CharacterPartProps = {
  src: string;
  alt: string;
  className: string;
};

function CharacterPart({
  src,
  alt,
  className,
}: CharacterPartProps) {
  return (
    <div className={`character-part ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="320px"
        className="object-contain"
      />
    </div>
  );
}

/* =====================================
   GINGERBREAD RIG
===================================== */

type GingerbreadRigProps = {
  variant: "boy" | "girl";
  name: string;
  photoUrl: string | null;
  zoom: number;
  positionX: number;
  positionY: number;
};

function GingerbreadRig({
  variant,
  name,
  photoUrl,
  zoom,
  positionX,
  positionY,
}: GingerbreadRigProps) {
  const isBoy = variant === "boy";
  const folder = `/characters/gingerbread-${variant}`;

  return (
    <div
      className={`gingerbread-rig ${
        isBoy ? "boy-rig" : "girl-rig"
      }`}
      aria-label={`${name} gingerbread character`}
    >
      {/* LEFT LEG */}
      <CharacterPart
        src={`${folder}/left-leg.png`}
        alt=""
        className="part-left-leg"
      />

      {/* RIGHT LEG */}
      <CharacterPart
        src={`${folder}/right-leg.png`}
        alt=""
        className="part-right-leg"
      />

      {/* BODY */}
      <CharacterPart
        src={`${folder}/${
          isBoy ? "body-only" : "dress-body"
        }.png`}
        alt=""
        className="part-body"
      />

      {/* LEFT ARM */}
      <CharacterPart
        src={`${folder}/left-arm.png`}
        alt=""
        className="part-left-arm"
      />

      {/* RIGHT ARM */}
      <CharacterPart
        src={`${folder}/right-arm.png`}
        alt=""
        className="part-right-arm"
      />

      {/* HEAD */}
      <div className="character-part part-head">
        <Image
          src={`${folder}/head.png`}
          alt={`${name}'s gingerbread head`}
          fill
          priority
          sizes="280px"
          className="object-contain"
        />

        {/* USER PHOTO */}
        {photoUrl && (
          <div className="character-photo-window">
            <div
              className="character-photo-inner"
              style={{
                width: `${zoom * 100}%`,
                height: `${zoom * 100}%`,
                left: `${(1 - zoom) * positionX}%`,
                top: `${(1 - zoom) * positionY}%`,
              }}
            >
              <Image
                src={photoUrl}
                alt={`${name}'s uploaded photo`}
                fill
                unoptimized
                sizes="180px"
                className="object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* =====================================
   MAIN COMPONENT
===================================== */

export default function GingerbreadCharacter({
  variant,
  name,
  animation = "idle",
}: GingerbreadCharacterProps) {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  const defaultZoom = variant === "girl" ? 1.15 : 1.4;
  const [zoom, setZoom] = useState(defaultZoom);
  const [positionX, setPositionX] = useState(50);
  const [positionY, setPositionY] = useState(50);

  /* CLEAN UP PHOTO URL */
  useEffect(() => {
    return () => {
      if (photoUrl) {
        URL.revokeObjectURL(photoUrl);
      }
    };
  }, [photoUrl]);

  /* PHOTO UPLOAD */
  const handlePhotoUpload = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Please choose an image smaller than 5MB.");
      event.target.value = "";
      return;
    }

    const newUrl = URL.createObjectURL(file);

    setPhotoUrl(newUrl);
    setZoom(defaultZoom);
    setPositionX(50);
    setPositionY(50);

    event.target.value = "";
  };

  /* RESET PHOTO */
  const resetPhoto = () => {
    setZoom(1.4);
    setPositionX(50);
    setPositionY(50);
  };

  /* REMOVE PHOTO */
  const removePhoto = () => {
    setPhotoUrl(null);
    setZoom(1.4);
    setPositionX(50);
    setPositionY(50);
  };

  return (
    <div className="flex flex-col items-center gap-4">

      {/* CHARACTER STAGE */}
      <div
        className={`gingerbread-character-stage ${
          variant === "boy" ? "boy-stage" : "girl-stage"
        } ${
          animation === "dance" ? "is-dancing" : "is-idle"
        }`}
      >
        <GingerbreadRig
          variant={variant}
          name={name}
          photoUrl={photoUrl}
          zoom={zoom}
          positionX={positionX}
          positionY={positionY}
        />
      </div>

      {/* CHARACTER NAME */}
      <h2 className="text-lg font-semibold text-[#F8EBDD]">
        {name}
      </h2>

      {/* PHOTO UPLOAD */}
      <label className="cursor-pointer rounded-full bg-[#A96332] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#C17B46]">
        {photoUrl ? "Change Photo" : "Upload Your Photo"}

        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handlePhotoUpload}
          className="hidden"
        />
      </label>

      {/* PHOTO EDITOR */}
      {photoUrl && (
        <div className="w-full max-w-[280px] space-y-5 rounded-2xl border border-[#E8C99D]/20 bg-[#4A2C23] p-4">

          <h3 className="font-semibold text-[#F8EBDD]">
            Adjust Your Photo
          </h3>

          {/* ZOOM */}
          <div>
            <label className="mb-2 flex justify-between text-sm text-[#E8C99D]">
              <span>Zoom</span>
              <span>{zoom.toFixed(1)}x</span>
            </label>

            <input
              type="range"
              min="1"
              max="2.5"
              step="0.1"
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full accent-[#E8C99D]"
            />
          </div>

          {/* HORIZONTAL POSITION */}
          <div>
            <label className="mb-2 flex justify-between text-sm text-[#E8C99D]">
              <span>Horizontal Position</span>
              <span>{positionX}%</span>
            </label>

            <input
              type="range"
              min="0"
              max="100"
              value={positionX}
              onChange={(e) => setPositionX(Number(e.target.value))}
              className="w-full accent-[#E8C99D]"
            />
          </div>

          {/* VERTICAL POSITION */}
          <div>
            <label className="mb-2 flex justify-between text-sm text-[#E8C99D]">
              <span>Vertical Position</span>
              <span>{positionY}%</span>
            </label>

            <input
              type="range"
              min="0"
              max="100"
              value={positionY}
              onChange={(e) => setPositionY(Number(e.target.value))}
              className="w-full accent-[#E8C99D]"
            />
          </div>

          {/* RESET */}
          <button
            type="button"
            onClick={resetPhoto}
            className="w-full rounded-full border border-[#E8C99D]/40 px-4 py-2 text-sm text-[#F8EBDD] hover:bg-[#65402F]"
          >
            Reset Adjustments
          </button>

          {/* REMOVE */}
          <button
            type="button"
            onClick={removePhoto}
            className="w-full text-sm text-red-300 hover:text-red-200"
          >
            Remove Photo
          </button>

        </div>
      )}
    </div>
  );
}
