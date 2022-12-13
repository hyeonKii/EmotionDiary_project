import { ModalBackgroundStyle } from "@/styles/common/Modal/background-style";

interface Props {
    setShowLoginForm?(value: boolean): void;
}

export default function ModalBackground({ setShowLoginForm }: Props) {
    if (setShowLoginForm) {
        return <ModalBackgroundStyle onClick={() => setShowLoginForm(false)} />;
    }

    return <ModalBackgroundStyle />;
}
