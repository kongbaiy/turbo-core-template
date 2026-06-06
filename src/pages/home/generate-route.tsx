import router from '@/router'

export const getRoute = () => {
    const routes = router.routes
        .map((item: any) => ({
            path: item.path.replace('/*', ''),
            ...item.handle,
        }))
        .filter((item) => item.name)

    return {
        path: '/',
        routes,
    }
}
