import "@/components/globals.css";

export const metadata = {
  title: "SwatSwap – Campus Trading at Swarthmore",
  description: "A student-to-student trading platform for Swarthmore College",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/logo.png"
        />
      </head>
      <body className="bg-maroon-50 text-maroon-900">{children}</body>
    </html>
  );
}
