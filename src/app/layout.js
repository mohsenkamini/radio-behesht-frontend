//import RootLayout from "@/app/layout";
import ThemeProviderWrapper from "./ThemeProviderWrapper";
export const metadata = {
    title: "رادیو بهشت",
    description: "سکوی شبکه اجتماعی دانشجویان دانشگاه شهید بهشتی",
};

export default function RootLayout ({children}) {
    return (
        <html lang="fa" dir="rtl">
	    <head>
              <link
                href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;700&display=swap"
                rel="stylesheet"
              />
      	    </head>
            <body>
                <ThemeProviderWrapper>
                {children}
                </ThemeProviderWrapper>
            </body>
        </html>
    );
}


