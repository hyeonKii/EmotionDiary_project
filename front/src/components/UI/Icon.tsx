import { iconName, IconSet } from "./iconSet";

interface IconProps {
    icon: iconName;
}

export default function Icon({ icon }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{
                position: "absolute",
                width: "40",
                height: "40,",
                top: "7px",
                left: "7px",
                color: "gray",
            }}
            viewBox={IconSet[icon].viewBox}
        >
            <path d={IconSet[icon].path} />
        </svg>
    );
}
