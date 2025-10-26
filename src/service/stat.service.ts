import { IStateResponse } from "../types/stat.types";

class StatService {
  private readonly API_URL = import.meta.env.VITE_PUBLIC_API_URL;
  async getStat(key: string) {
    const req = await fetch(
      `${this.API_URL}/analytics/stats?secret_key=${key}`
    );
    const response = (await req.json()) as IStateResponse | undefined;
    if (req.ok) {
      return response;
    } else return undefined;
  }
}

export const statService = new StatService();
