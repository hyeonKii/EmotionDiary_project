import { gitIconName, gitIconSet } from "@/styles/footer/footerIconSet";

interface GitIconProps {
    icon: gitIconName;
}

export default function footerIcon({ icon }: GitIconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{
                width: "4.5rem",
                height: "4.5rem",
                marginTop: "2rem",
            }}
            viewBox={gitIconSet[icon].viewBox}
        >
            <path d={gitIconSet[icon].path} fill={`${gitIconSet[icon].fill}`}/>
        </svg>
    );
};
