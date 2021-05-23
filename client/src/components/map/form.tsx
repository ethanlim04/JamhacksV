import React from "react"

type FormProps = {
    city: string
    storeName: string
}

type FormState = {
    status: number
    images: string[]
}

export class Form extends React.PureComponent<FormProps, FormState> {
    public constructor(props: FormProps) {
        super(props)

        this.state = {
            status: 0,
            images: [],
        }
    }

    public onSubmit = () => {
        console.log(this.state)
    }

    public onSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({status: Number(event.target.value)})
    }

    public render = (): JSX.Element => (
        <form
            className="container-fluid d-flex flex-row justify-content-around pt-3"
            onSubmit={this.onSubmit}
        >
            <label className="form-label">
                How busy is {this.props.storeName} in {this.props.city} right now?
                <input
                    type="range"
                    className="form-range"
                    min="0"
                    max="5"
                    value={this.state.status}
                    onChange={this.onSliderChange}
                />
                <small className="text-muted">{this.state.status} / 5</small>
            </label>
        </form>
    )
}
