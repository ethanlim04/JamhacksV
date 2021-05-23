import React from "react"
import {formatDistance} from "../../utils"

type CardProps = {
    title?: string
    distance?: number
    image?: string
    text?: string
    button?: {
        link: string
        text: string
        color?: string
    }
    footerText?: string
    headerText?: string
}

export const Card: React.FC<CardProps> = ({
    title,
    distance,
    image,
    text,
    button,
    footerText,
    headerText,
}) => (
    <div className="card bg-darker">
        {image ? <img className="card-img-top" src={image} alt="Card image cap" /> : undefined}
        {headerText ? <div className="card-header">{headerText}</div> : undefined}
        <div className="card-body">
            <div className="row">
                {title ? (
                    <div className="col-auto card-title">
                        <h5>{title}</h5>
                    </div>
                ) : undefined}
                {distance ? (
                    <div className="col card-text">
                        <small className="text-muted">{`${formatDistance(distance)} away`}</small>
                    </div>
                ) : undefined}
            </div>
            {text ? <p className="card-text">{text}</p> : undefined}
            {button ? (
                <a href={button.link} className={`btn btn-${button.color ?? "primary"}`}>
                    {button.text}
                </a>
            ) : undefined}
        </div>
        {footerText ? (
            <div className="card-footer">
                <small className="text-muted">{footerText}</small>
            </div>
        ) : undefined}
    </div>
)
