import { ErrorComponent, HeadContent, Outlet, Scripts, createRootRoute, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanstackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


import Header from '../components/Header'

import appCss from '../styles.css?url'
import MainLayout from '@/layouts/MainLayout'

export const Route = createRootRouteWithContext<{queryClient: QueryClient}>()({
  
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: () => <div>Error 404 Not Found</div>,
  errorComponent: (props) => {
    return(
      <RootDocument>
          <ErrorComponent error={props}/>
      </RootDocument>
    )
  }
})

function RootComponent() {
  return(
    <RootDocument>
      <Outlet/>
    </RootDocument>
  )
}
function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Header />
        <MainLayout>
          {children}
        </MainLayout>
        <TanstackDevtools
          config={{
            position: 'bottom-left',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            {
              name: 'Tanstack Query',
              render: <ReactQueryDevtools />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
