export type TimeSlot = {
  day: string;
  minutes: number;
  energy: "low" | "medium" | "high";
};

export type PlannerInput = {
  sleepWindow: "under-6" | "6-7" | "7-plus";
  kidAgeGroup: "0-2" | "3-7" | "8-12" | "13-plus";
  equipment: "none" | "dumbbells" | "bands" | "mixed";
  stressLevel: "high" | "moderate" | "low";
  slots: TimeSlot[];
};

export const starterSlots: TimeSlot[] = [
  { day: "Monday", minutes: 15, energy: "medium" },
  { day: "Wednesday", minutes: 20, energy: "high" },
  { day: "Friday", minutes: 10, energy: "low" },
];

export const adaptiveRules = [
  {
    trigger: "completion_lt_60",
    suggestion:
      "Shift to two anchor sessions + one optional micro-session. Keep wins small for one week.",
  },
  {
    trigger: "energy_low_3_days",
    suggestion:
      "Replace one fat-loss workout with mobility and drop intensity by one level for 7 days.",
  },
  {
    trigger: "completion_gt_85",
    suggestion:
      "Add one progressive overload block: +2 reps per set on your strength day.",
  },
];
