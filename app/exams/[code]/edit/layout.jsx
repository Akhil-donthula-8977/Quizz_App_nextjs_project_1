import React, { Suspense } from 'react'

const layout = ({ children }) => {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            {children}
        </Suspense>

    )
}

export default layout