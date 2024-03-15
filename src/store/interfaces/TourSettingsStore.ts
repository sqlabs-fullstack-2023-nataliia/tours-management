import { TourSettingsModel } from "../../models/TourSettingsModel";

export default interface TourSettingsStore {
    settings: TourSettingsModel | null,
    setSettings: (settings: TourSettingsModel) => void,
}