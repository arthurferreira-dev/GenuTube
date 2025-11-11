import React from "react";

export interface GoogleUserProps {
    name: string;
    email: string;
    photo: string;
    id: number | string;
}

export interface RatingUserProps {
    email: string;
    rating: string;
}

export interface Props {
    children: React.ReactNode
}