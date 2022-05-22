import React, {useContext} from "react";
import {useDate} from "../hooks/clock.hook";
import {AuthContext} from "../context/AuthContext";

export const SchedulePage = () =>{
    const {date, time} = useDate()
    const auth = useContext(AuthContext)
    const tempList = [
        {
            audit: "1/414",
            name: "Архитектура информационных систем",
            type: "лекц",
            prep: "Файфель Борис Леонидович"
        },
        {
            audit: "5/318",
            name: "Архитектура ЭВМ",
            type: "лекц",
            prep: "Дауров Станислав Константинович"
        },
        {
            audit: "1/418A",
            name: "Информационные технологии",
            type: "прак",
            prep: "Бровко Александр Валерьевич"
        },
        {
            audit: "1/420",
            name: "Современные технологии управления базами данных",
            type: "лекц",
            prep: "Кузьмин Алексей Константинович"
        },

    ]

    return(
        <div className={"schedulePageContainer"}>
            <nav>
                <h1 className={"logo"}>DiSP</h1>
                <div className={"logout"} onClick={auth.logout}>x</div>
            </nav>
            <div className={"clock"}>
                <div>{date}</div>
                <div>{time}</div>
            </div>
            <div className={"table"}>
                <div className={"row"}>
                    <div className={"item"}>
                        <div>1</div>
                        8.00-9.30
                    </div>
                    {tempList.map((para, index) =>{
                        return(
                        <div className={"item"}>
                            <div>{para.audit}</div>
                            <div className={"bold"}>{para.name}</div>
                            <div>{para.type}</div>
                            <div>{para.prep}</div>
                        </div>
                    )})}
                </div>
                <div className={"row"}>
                    <div className={"item"}></div>
                    <div className={"item"}></div>
                    <div className={"item"}></div>
                </div>
                <div className={"row"}>
                    <div className={"item"}></div>
                    <div className={"item"}></div>
                    <div className={"item"}></div>
                </div>
            </div>
        </div>
    )
}