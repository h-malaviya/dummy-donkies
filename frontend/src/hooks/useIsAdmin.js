import { getStorage } from "../shared/utils/storage";

export default function useIsAdmin() {
  const role = getStorage("userRole");
  return role === "admin";
}
