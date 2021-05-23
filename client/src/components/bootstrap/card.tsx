import React from "react"

type CardProps = {
    title?: string
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
    image,
    text,
    button,
    footerText,
    headerText,
}) => (
    <div className="card bg-dark">
        {image ? <img className="card-img-top" src={image} alt="Card image cap" /> : undefined}
        {headerText ? <div className="card-header">{headerText}</div> : undefined}
        <div className="card-body">
            {title ? <h5 className="card-title">{title}</h5> : undefined}
            {text ? <p className="card-text">{text}</p> : undefined}
            {button ? (
                <a href={button.link} className={`btn btn-${button.color ?? "primary"}`}>
                    {button.text}
                </a>
            ) : undefined}
        </div>
        {footerText ? <div className="card-footer text-muted">{footerText}</div> : undefined}
    </div>
)
