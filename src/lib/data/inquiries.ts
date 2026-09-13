export type InquiryType = "quote" | "measurement" | "custom" | "visualizer";
export type InquiryStatus = "new" | "reviewed";

export type Inquiry = {
  id: string;
  type: InquiryType;
  name: string;
  phone: string;
  location?: string;
  summary: string;
  status: InquiryStatus;
  createdAt: string;
};

export const inquiries: Inquiry[] = [
  {
    id: "inq-1042",
    type: "custom",
    name: "Sample — A. Hassan",
    phone: "+973 3xxx xxxx",
    location: "Riffa",
    summary: "Custom CNC screen for a villa staircase. Reference photos attached.",
    status: "new",
    createdAt: "2026-09-12",
  },
  {
    id: "inq-1041",
    type: "quote",
    name: "Sample — Sara M.",
    phone: "+973 3xxx xxxx",
    location: "Amwaj",
    summary: "TV unit and feature wall for a living room.",
    status: "new",
    createdAt: "2026-09-11",
  },
  {
    id: "inq-1040",
    type: "visualizer",
    name: "Sample — K. Ali",
    phone: "+973 3xxx xxxx",
    location: "Seef",
    summary: "Visualizer preview — bedroom with wallpaper concept.",
    status: "reviewed",
    createdAt: "2026-09-10",
  },
  {
    id: "inq-1039",
    type: "measurement",
    name: "Sample — N. Yusuf",
    phone: "+973 3xxx xxxx",
    location: "Juffair",
    summary: "Free measurement for cupboard and bedroom background.",
    status: "reviewed",
    createdAt: "2026-09-08",
  },
];
