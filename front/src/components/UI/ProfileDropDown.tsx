import styled from "styled-components";

function ProfileDropDown() {
    return (
        <DropDownStyle>
            <li>
                <button>정보</button>
            </li>
            <li>
                <button>로그아웃</button>
            </li>
        </DropDownStyle>
    );
}

export default ProfileDropDown;

const DropDownStyle = styled.ul`
    width: 6rem;
    height: 5rem;

    margin-top: 1rem;
    padding: 1rem;

    list-style: none;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    position: absolute;
    top: 5vh;
    right: 1.25rem;

    background-color: white;

    button {
        background-color: transparent;
        border: none;
        font-size: 1.25rem;
    }
`;
