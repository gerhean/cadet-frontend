import { IAssessment } from "../assessment/assessmentShape";

import * as React from 'react'

// import {
//     Button,
//     Card,
//     Elevation,
//     Icon,
//     IconName,
//     Intent,
//     Text,
//   } from '@blueprintjs/core'
// import { IconNames } from '@blueprintjs/icons'
// import * as React from 'react'
// import { NavLink } from 'react-router-dom'
// import Textarea from 'react-textarea-autosize';

// import { IAssessmentOverview, IQuestion, IAssessment } from '../assessment/assessmentShape'
// import { controlButton } from '../commons'
// import Markdown from '../commons/Markdown'

// const DEFAULT_QUESTION_ID: number = 0

type Props = {
    path: any,
}

interface IState {
    assessment: IAssessment | null,
    fieldValue: string,
}

// const textareaStyle = {
//     "height": "100%",
//     "width": "100%",
//     "overflow": "hidden" as "hidden",
//     "resize": "none" as "none"
// }

export class EditingAssessment extends React.Component<Props, IState> {
    public constructor(props: Props) {
        super(props)
        this.state = {
            assessment: null,
            fieldValue: ''
        }
    }

    public componentDidMount(){
        const assessment = localStorage.getItem("MissionEditingAssessmentSA");
        if (assessment) {
            this.setState({ assessment: JSON.parse(assessment) });
        }
    }

    public render() {
        return <div onClick={this.toggleAssessmentField(this.props.path)}>
            <input type="text" value={this.state.fieldValue} onChange={this.handleEditingAssessment} onBlur={this.saveAssessment(this.props.path)}/>
        </div>;
    }

    private saveAssessment = (path: any) => (e: any) => {
        const assessment = this.state.assessment
        this.assignFieldToPath(0, path, assessment, this.state.fieldValue)
        // tslint:disable-next-line:no-console
        console.log(assessment);
        localStorage.setItem('MissionEditingAssessmentSA', JSON.stringify(assessment));
    }
    
    private handleEditingAssessment = (e: any) => this.setState({ fieldValue: e.target.value })

    private pathToField: any = (i: number, path: any, obj: any) => {
        return path.length - 1 === i ? obj[path[i]] : this.pathToField(i + 1, path, obj[path[i]])
    }

    private assignFieldToPath: any = (i: number, path: any, obj: any, value: any) => {
        if (path.length - 1 === i) {
            obj[path[i]] = value
        } else {
            this.assignFieldToPath(i + 1, path, obj[path[i]], value)
        } 
    }
    
    private toggleAssessmentField = (path: any) => (e: any) => {
        this.setState({
            fieldValue: this.pathToField(0, path, this.state.assessment)
        });
    };
}