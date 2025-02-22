import { Banner } from "@/components/app/banner/banner";
import { Nav } from "@/components/app/nav";
import { Search } from "@/components/app/search";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import MainError from "./error";
import { appFetch } from "@/lib/request";

export default async function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const categoryList = await fetchCategoryList()
    return (
        <main>
            <Banner />
            <ErrorBoundary errorComponent={MainError}>
                <Search />
                <Nav list={categoryList} />
                {children}
            </ErrorBoundary>
        </main>
    );
}

async function fetchCategoryList() {
    const res = await appFetch('/categories')
    const data = await res.json()
    if (data.error) return []
    return data.data
}
