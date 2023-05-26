import "@/styles/globals.css";
import Provider from "@/components/Provider";

export const metadata = {
  title: "Diary",
  description: "Save your day in a portable imaginary space.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main"></div>
          {/* Provide pen paper wallpaper or texture to page here */}
          <main className="app">{children}</main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
