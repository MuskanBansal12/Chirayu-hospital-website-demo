import "./globals.css";

export const metadata = {
  title: "Chirayu Swasthya | Gastro & Liver Hospital",
  description: "Chirayu Swasthya Gastro & Liver Hospital, Hanumangarh, Rajasthan. Contact us for hospital enquiries and directions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
