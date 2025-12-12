"use client"
import React, { useEffect } from 'react';

const Scroll = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, []);
    return (
        <div>

        </div>
    );
}

export default Scroll;
