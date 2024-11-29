//import RootLayout from "@/app/layout";

export const metadata = {
    title: "رادیو بهشت",
    description: "سکوی شبکه اجتماعی دانشجویان دانشگاه شهید بهشتی",
};

export default function RootLayout ({children}) {
    return (
        <html lang="fa" dir="rtl">
            <body>
                {children}
            </body>
        </html>
    );
}


