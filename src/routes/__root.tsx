import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanstackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


import Header from '../components/Header'

import appCss from '../styles.css?url'
import MainLayout from '@/layouts/MainLayout'
import NotFoundComponent from '@/components/404NotFound'
import ErrorComponent from '@/components/ErrorComponent'

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
  notFoundComponent: () => <NotFoundComponent/>,
  errorComponent: (props) => {
    return(
      <RootDocument>
          <ErrorComponent error={props.error} />
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
