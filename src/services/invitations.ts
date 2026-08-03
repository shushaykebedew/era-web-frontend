import { api } from "./api";

export interface RequestInvitationPayload {
  email: string;
}

export interface CompleteInvitationPayload {
  token: string;
  fullName: string;
  phone: string;
  company: string;
  position: string;
}

export const invitationsService = {
  requestInvite: async (payload: RequestInvitationPayload) => {
    const { data } = await api.post("/invitations/request", payload);
    return data;
  },

  validateToken: async (token: string) => {
    const { data } = await api.get(`/invitations/validate-token?token=${token}`);
    return data;
  },

  completeInvite: async (payload: CompleteInvitationPayload) => {
    const { data } = await api.post("/invitations/complete", payload);
    return data;
  },
};
