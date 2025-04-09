/* eslint-disable @typescript-eslint/no-explicit-any */

const MaxWidth = ({children}: any) => {
    return (
        <div className="mx-auto max-w-7xl">
            {children}
        </div>
    );
};

export default MaxWidth;