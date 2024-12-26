import { useEffect } from "react";
import { Col, Spinner } from "react-bootstrap";
import { camelToCapitalize, useAnimatedValue } from "../../components/utils";

export default ({ stats, header }) => {
    let children;
    if (stats) {
        const total = Object.keys(stats).reduce((v, k) => stats[k] + v, 0)
        children = <div>
            {Object.keys(stats).map(k => <StatsCardItem name={camelToCapitalize(k)} value={stats[k]} total={total} />)}
        </div>
    } else children = <div className="w-100 d-flex justify-content-center align-items-center p-3"><Spinner /></div>

    return <div className="card w-auto">
        <div className="card-body" style={{ transitionDuration: '1s' }}>
            <h5 className="card-title mb-2">
                {header}
            </h5>
            {children}
        </div>
    </div>
}

const StatsCardItem = ({ name, value, total }) => {
    const [animatedValue, animateTo] = useAnimatedValue(0, { duration: 1500 })
    useEffect(() => {
        animateTo(value)
    }, [])
    return <Col className="p-1">
        <div className="card-text text-gray-600 ">{name}:  {animatedValue}/{total}</div>
    </Col>
}