import React from "react"

type FormProps = {
    city: string
    storeName: string
}

type FormState = {
    status: string
    images: string[]
}

export class Form extends React.PureComponent<FormProps, FormState> {
    public constructor(props: FormProps) {
        super(props)

        this.state = {
            status: "",
            images: [],
        }
    }

    public render = (): JSX.Element => <form></form>
}
