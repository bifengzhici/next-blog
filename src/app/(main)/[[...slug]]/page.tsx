import { BlogRouteParams, BlogSearchParams } from "@/types/blog";
import qs from 'qs';
import { Blog } from "@/components/app/blog";
import { appFetch } from "@/lib/request";

export default async function Page(props: {
    params: Promise<{ slug: string[] }>,
    searchParams: Promise<BlogSearchParams>
}) {
    const params = await props.params
    const searchParams = await props.searchParams
    const category = decodeURIComponent(params.slug?.[0] || '')

    const { search, sort } = searchParams

    const blogList = await fetchBlogList({ category, search, sort })

    return (
        <Blog list={blogList} />
    )
}

async function fetchBlogList({ category, search, sort }: BlogRouteParams & BlogSearchParams) {
    const query = qs.stringify({
        filters: {
            ...(category && {
                category: { name: { $eq: category } }
            }),
            ...(search && {
                $or: [
                    { title: { $containsi: search } },
                    { category: { name: { $containsi: search } } }
                ]
            })
        },
        sort: sort === 'hot' ? ['view:desc'] : ['createdAt:desc'],
        populate: ['category', 'cover'],
    }, { encodeValuesOnly: true });

    const res = await appFetch(`/articles?${query}`)
    const data = await res.json()
    if (data.error) return []
    return data.data
}
