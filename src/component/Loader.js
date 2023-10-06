import React from 'react';

const Loader = () => {
    return (
        <div>
            <div id="line_loader"></div>
            <div id="loader">
                <div className="loader">
                    <div className="loader__eq mx-auto"><span></span> <span></span> <span></span> <span></span>
                        <span></span>
                        <span></span></div>
                    <span className="loader__text mt-2">Loading</span></div>
            </div>
        </div>
    );
};

export default Loader;