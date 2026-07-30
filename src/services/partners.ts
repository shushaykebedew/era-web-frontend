import { api } from "./api";
import type { Partner } from "@/types";

export interface PartnershipRequestInput {
  name: string;
  logo?: File | null;
  website?: string;
  description?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  tier?: string;
}

function toFormData(data: PartnershipRequestInput): FormData {
  const fd = new FormData();
  const { logo, ...rest } = data;
  for (const [key, value] of Object.entries(rest)) {
    if (value !== undefined && value !== null && value !== "") {
      fd.append(key, String(value));
    }
  }
  if (logo instanceof File) {
    fd.append("logo", logo);
  }
  return fd;
}

export const partnersService = {
  /**
   * Fetch all active partners (public — no auth required).
   */
  list: async (): Promise<Partner[]> => {
    const res = await api.get<{ success: boolean; data: Partner[] }>("/partners");
    return res.data.data ?? [];
  },

  /**
   * Submit a partnership request (public form submission).
   * The backend will set status=PENDING automatically.
   */
  submit: async (data: PartnershipRequestInput): Promise<void> => {
    await api.post("/partners", toFormData(data), {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
