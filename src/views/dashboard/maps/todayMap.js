import React from 'react'
import Card from '../../../components/Card'
import {Row,Col} from 'react-bootstrap'


const TodayMap = () => {
    return (
        <div>
            <Row>
                <Col lg="12">
                    <Card>
                        <Card.Header className="d-flex justify-content-between">
                            <div className="header-title">
                                <h4 className="card-title">Basic</h4>
                            </div>
                        </Card.Header>
                        <div className="card-body">
                            <p>Visualize the Shop for You</p>
                            <iframe className="w-100" title="map" src="https://node.eliltatrading.com/Dec1ShopVisualization.html" height="500" allowFullScreen=""></iframe>
    </div>
                    </Card>
                </Col>
            </Row>
           
                     
        </div>
    )
}

export default TodayMap
