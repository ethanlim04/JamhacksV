import React from "react"
import axios from "axios"
import qs from "query-string"
import {url} from "../../globals"

type FormProps = {
    city: string
    storeName: string
}

type FormState = {
    status: number
    image?: File
}

export class Form extends React.PureComponent<FormProps, FormState> {
    public constructor(props: FormProps) {
        super(props)

        this.state = {
            status: 0,
        }
    }

    public onSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData()

        console.log(this.state.image)

        if (this.state.image !== undefined) {
            formData.append(this.state.image.name, this.state.image, this.state.image.name)
        }

        const response = await fetch(
            `${url}/addData?${qs.stringify({
                username: "",
                ...this.props,
                status: this.state.status,
                picture: this.state.image !== undefined,
            })}`,
            {
                method: "POST",
                body: formData,
            },
        )

        console.log(response)
    }

    public onSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({status: Number(event.target.value)})
    }

    public onFileUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const file = event.target?.files?.[0]

        if (file) {
            if (!/(\.png|\.jpg|\.jpeg)$/u.test(file.name)) {
                alert("Invalid image type")
                this.setState({image: undefined})
            } else {
                this.setState({image: file})
            }
        } else {
            this.setState({image: undefined})
        }
    }

    public render = (): JSX.Element => (
        <form
            className="container-fluid d-flex flex-column justify-content-around pt-3 g-3"
            onSubmit={this.onSubmit}
        >
            <label className="form-label">
                How busy is {this.props.storeName} in {this.props.city} right now?
                <br />
                <small className="text-muted">{this.state.status} / 10</small>
                <input
                    type="range"
                    className="form-range"
                    min={0}
                    max={10}
                    value={this.state.status}
                    onChange={this.onSliderChange}
                />
                <div className="d-flex flex-row justify-content-between">
                    <small className="text-muted">Empty</small>
                    <small className="text-muted">Extremely Busy</small>
                </div>
            </label>
            <label className="form-label mt-3">
                Optional: Please upload a picture
                <input type="file" accept=".png," onChange={this.onFileUpload} />
            </label>
            <button type="submit" className="btn btn-primary mt-3">
                Submit
            </button>
        </form>
    )
}
