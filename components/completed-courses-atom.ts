import { atomWithStorage, createJSONStorage } from "jotai/utils";

const storage = createJSONStorage<Record<string, string[]>>(
  () => sessionStorage,
);
export const completedCoursesAtom = atomWithStorage(
  "completedCourses",
  {},
  storage,
);
