import {sortData} from "./util";
import numeral from "numeral";
const Table = (props) => {
    const sortedData = sortData(props.countries);
    const countries = sortedData;
    return(
        <>
            <div className="table">
                {countries.map((c) => (
                    <tr>
                        <td>{c.country}</td>
                        <td>
                            <strong>{numeral(c.cases).format("0,0")}</strong>
                        </td>
                    </tr>
                ))}
            </div>
        </>
    )
}
export default Table;