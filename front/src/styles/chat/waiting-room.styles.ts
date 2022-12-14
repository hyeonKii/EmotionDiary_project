import styled from "styled-components";

const Head = styled.div`
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
        padding: 8px 12px;
    }
`;

const ChatRoomstyle = styled.div`
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    height: 80px;

    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding-left: 30px;

    div {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 130px;
        flex-direction: column;
        div {
            text-align: center;
            width: 30px;
            height: 30px;
            background: #f87474;
            border-radius: 20px;
            margin-bottom: 10px;
        }
        span {
            width: 100%;
        }
    }
`;

const Table = styled.table`
    width: 100%;
    border: 1px solid #000;
    border-collapse: collapse;
    margin-top: 12px;

    thead {
        white-space: pre-wrap;
        th {
            padding: 8px 0;
        }
    }

    tbody {
        text-align: center;
    }

    th,
    td {
        border: 1px solid #000;
    }
`;

export { Head, Table, ChatRoomstyle };
