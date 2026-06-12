import "server-only";

// A small, curated movement library the coach agent queries via the
// `lookup_exercises` tool. Grounding plans in a vetted list keeps the output
// safe and concrete instead of relying on the model to recall exercises.

export type ExerciseFocus = "strength" | "mobility" | "cardio" | "core";
export type ExerciseEquipment = "none" | "dumbbells" | "bands" | "full-gym";

export type Exercise = {
  name: string;
  focus: ExerciseFocus;
  /** What the move needs. "none" = bodyweight, available to everyone. */
  equipment: ExerciseEquipment;
  /** True = joint-friendly, no jumping/impact (apartment, kids asleep, sore). */
  lowImpact: boolean;
  /** One short coaching cue. */
  cue: string;
};

export const EXERCISES: Exercise[] = [
  // Strength — bodyweight
  { name: "Bodyweight squat", focus: "strength", equipment: "none", lowImpact: true, cue: "Sit back, knees track over toes, chest up." },
  { name: "Push-up (knees ok)", focus: "strength", equipment: "none", lowImpact: true, cue: "Hands under shoulders, body in one line, lower with control." },
  { name: "Reverse lunge", focus: "strength", equipment: "none", lowImpact: true, cue: "Step back, drop the back knee, push through the front heel." },
  { name: "Glute bridge", focus: "strength", equipment: "none", lowImpact: true, cue: "Squeeze glutes at the top, ribs down." },
  { name: "Wall sit", focus: "strength", equipment: "none", lowImpact: true, cue: "Thighs parallel, back flat on the wall, breathe." },
  { name: "Squat jump", focus: "strength", equipment: "none", lowImpact: false, cue: "Explode up, land soft through the whole foot." },
  // Strength — dumbbells
  { name: "Goblet squat", focus: "strength", equipment: "dumbbells", lowImpact: true, cue: "Hold one bell at the chest, elbows inside the knees." },
  { name: "Dumbbell row", focus: "strength", equipment: "dumbbells", lowImpact: true, cue: "Flat back, drive the elbow to the hip." },
  { name: "Dumbbell shoulder press", focus: "strength", equipment: "dumbbells", lowImpact: true, cue: "Ribs down, press overhead without arching." },
  { name: "Romanian deadlift", focus: "strength", equipment: "dumbbells", lowImpact: true, cue: "Hinge at the hips, soft knees, feel the hamstrings." },
  // Strength — bands
  { name: "Band squat", focus: "strength", equipment: "bands", lowImpact: true, cue: "Band above the knees, push the knees out as you stand." },
  { name: "Band row", focus: "strength", equipment: "bands", lowImpact: true, cue: "Anchor low, squeeze the shoulder blades back." },
  { name: "Band pull-apart", focus: "strength", equipment: "bands", lowImpact: true, cue: "Arms straight, pull the band to the chest, control back." },
  // Strength — full gym
  { name: "Goblet squat (rack)", focus: "strength", equipment: "full-gym", lowImpact: true, cue: "Controlled tempo, full depth if mobility allows." },
  { name: "Ring or TRX row", focus: "strength", equipment: "full-gym", lowImpact: true, cue: "Straight line head to heels, pull the chest to the handles." },
  // Mobility
  { name: "Cat-cow", focus: "mobility", equipment: "none", lowImpact: true, cue: "Move with the breath, segment the spine." },
  { name: "World's greatest stretch", focus: "mobility", equipment: "none", lowImpact: true, cue: "Lunge, hand down, rotate the top arm to the ceiling." },
  { name: "Hip 90/90 switch", focus: "mobility", equipment: "none", lowImpact: true, cue: "Slow, rotate from the hips, stay tall." },
  { name: "Thoracic rotation", focus: "mobility", equipment: "none", lowImpact: true, cue: "On all fours, hand behind the head, open to the ceiling." },
  { name: "Hamstring sweep", focus: "mobility", equipment: "none", lowImpact: true, cue: "Hinge to a long spine, sweep the arms underneath." },
  { name: "Child's pose", focus: "mobility", equipment: "none", lowImpact: true, cue: "Hips back to the heels, breathe into the back ribs." },
  // Cardio
  { name: "Brisk march in place", focus: "cardio", equipment: "none", lowImpact: true, cue: "Drive the knees, pump the arms, stay quiet on the feet." },
  { name: "Step-up", focus: "cardio", equipment: "none", lowImpact: true, cue: "Whole foot on the step, stand tall, control down." },
  { name: "Fast feet shuffle", focus: "cardio", equipment: "none", lowImpact: true, cue: "Small quick steps, stay light, low and athletic." },
  { name: "Jumping jacks", focus: "cardio", equipment: "none", lowImpact: false, cue: "Full range, land soft, keep a steady rhythm." },
  { name: "High knees", focus: "cardio", equipment: "none", lowImpact: false, cue: "Knees to hip height, quick turnover, tall posture." },
  // Core
  { name: "Front plank", focus: "core", equipment: "none", lowImpact: true, cue: "Elbows under shoulders, squeeze glutes, no sag." },
  { name: "Dead bug", focus: "core", equipment: "none", lowImpact: true, cue: "Low back glued down, opposite arm and leg reach." },
  { name: "Bird dog", focus: "core", equipment: "none", lowImpact: true, cue: "Reach long, no twist in the hips, slow and steady." },
  { name: "Side plank", focus: "core", equipment: "none", lowImpact: true, cue: "Stack the hips, push the bottom side away from the floor." },
];

export type LookupQuery = {
  focus?: ExerciseFocus;
  equipment?: ExerciseEquipment;
  lowImpact?: boolean;
  limit?: number;
};

/**
 * Filters the library. Bodyweight ("none") moves are always eligible — they
 * fit any equipment setting — so a `dumbbells` query returns dumbbell + none.
 */
export function lookupExercises(query: LookupQuery): Pick<Exercise, "name" | "focus" | "cue">[] {
  const limit = Math.max(1, Math.min(query.limit ?? 8, 12));
  return EXERCISES.filter((ex) => {
    if (query.focus && ex.focus !== query.focus) return false;
    if (query.equipment && query.equipment !== "none" && ex.equipment !== query.equipment && ex.equipment !== "none") return false;
    if (query.equipment === "none" && ex.equipment !== "none") return false;
    if (query.lowImpact === true && !ex.lowImpact) return false;
    return true;
  })
    .slice(0, limit)
    .map(({ name, focus, cue }) => ({ name, focus, cue }));
}
