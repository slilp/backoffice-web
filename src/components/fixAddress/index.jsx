import React, { useState, useEffect } from "react";
import { Select } from "antd";
const { Option } = Select;

const provinceData = ["กรุงเทพมหานคร"];

const cityData = {
  กรุงเทพมหานคร: ["พระนคร", "ดุสิต"],
};

const districtData = {
  พระนคร: ["พระบรมมหาราชวัง", "วัดราชบพิธ", "ตลาดยอด"],
  ดุสิต: ["บางซื่อ", "ดุสิต", "สี่เเยกมหานาค"],
};
const zipCodeData = {
  พระบรมมหาราชวัง: ["100101"],
  วัดราชบพิธ: ["100103"],
  ตลาดยอด: ["100108"],
  บางซื่อ: ["100205"],
  ดุสิต: ["100201"],
  สี่เเยกมหานาค: ["100204"],
};

const addressCode = {
  100101: 1,
  100103: 4,
  100108: 3,
  100205: 2,
  100201: 5,
  100204: 6,
};

function FixAddressSelector({
  setAddressId,
  initProvince,
  initSubDistrict,
  initDistrict,
  initZipCode,
}) {
  const [cities, setCities] = useState(cityData[provinceData[0]]);
  const [selectedProvince, setSelectedProvince] = useState(provinceData[0]);
  const [selectedDistrict, setSelectedDistrict] = useState(
    cityData[provinceData[0]][0]
  );
  const [districts, setDistricts] = useState(
    districtData[cityData[provinceData[0]][0]]
  );
  const [selectedSubDistrict, setSelectedSubDistrict] = useState(
    districtData[cityData[provinceData[0]][0]][0]
  );
  const [subDistricts, setSubDistricts] = useState(
    zipCodeData[districtData[cityData[provinceData[0]][0]][0]]
  );
  const [selectedZipCode, setSelectedZipCode] = useState(
    zipCodeData[districtData[cityData[provinceData[0]][0]][0]][0]
  );

  useEffect(() => {
    if (initProvince) {
      setSelectedProvince(initProvince);
      setSelectedDistrict(initDistrict);
      setSelectedSubDistrict(initSubDistrict);
      setSelectedZipCode(initZipCode);
      setCities(cityData[initProvince]);
      setDistricts(districtData[initDistrict]);
      setSubDistricts(zipCodeData[initSubDistrict]);
    }
  }, [initProvince, initDistrict, initSubDistrict, initZipCode]);

  const handleProvinceChange = (value) => {
    setCities(cityData[value]);
    setSelectedDistrict(cityData[value][0]);
    setDistricts(districtData[cityData[value][0]]);
    setSelectedSubDistrict(districtData[cityData[value][0]][0]);
    setSubDistricts(zipCodeData[districtData[cityData[value][0]][0]]);
    setSelectedZipCode(zipCodeData[districtData[cityData[value][0]][0]][0]);
    setAddressId(
      addressCode[zipCodeData[districtData[cityData[value][0]][0]][0]]
    );
  };

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value);
    setDistricts(districtData[value]);
    setSelectedSubDistrict(districtData[value][0]);
    setSubDistricts(zipCodeData[districtData[value][0]]);
    setSelectedZipCode(zipCodeData[districtData[value][0]][0]);
    setAddressId(addressCode[zipCodeData[districtData[value][0]][0]]);
  };

  const handleSubDistrictChange = (value) => {
    setSelectedSubDistrict(value);
    setSubDistricts(zipCodeData[value]);
    setSelectedZipCode(zipCodeData[value][0]);
    setAddressId(addressCode[zipCodeData[value][0]]);
  };

  const handleZipCodeChange = (value) => {
    setSelectedZipCode(value);
    setAddressId(addressCode[value]);
  };

  return (
    <div className="p-1">
      <h5>จังหวัด</h5>
      <Select
        defaultValue={provinceData[0]}
        style={{ width: 250 }}
        value={selectedProvince}
        onChange={handleProvinceChange}
        disabled
      >
        {provinceData.map((province) => (
          <Option
            key={province}
            className="font-kanit"
            style={{ fontWeight: "300" }}
          >
            {province}
          </Option>
        ))}
      </Select>
      <br></br>
      <br></br>
      <h5>เขต</h5>
      <Select
        style={{ width: 250 }}
        value={selectedDistrict}
        onChange={handleDistrictChange}
        disabled
      >
        {cities.map((city) => (
          <Option
            key={city}
            className="font-kanit"
            style={{ fontWeight: "300" }}
          >
            {city}
          </Option>
        ))}
      </Select>
      <br></br>
      <br></br>
      <h5>เเขวง / ตำบล</h5>
      <Select
        style={{ width: 250 }}
        value={selectedSubDistrict}
        onChange={handleSubDistrictChange}
        disabled
      >
        {districts.map((city) => (
          <Option
            key={city}
            className="font-kanit"
            style={{ fontWeight: "300" }}
          >
            {city}
          </Option>
        ))}
      </Select>
      <br></br>
      <br></br>
      <h5>รหัสไปรษณีย์</h5>
      <Select
        style={{ width: 250 }}
        value={selectedZipCode}
        onChange={handleZipCodeChange}
        disabled
      >
        {subDistricts.map((city) => (
          <Option
            key={city}
            className="font-kanit"
            style={{ fontWeight: "300" }}
          >
            {city}
          </Option>
        ))}
      </Select>
    </div>
  );
}

export default FixAddressSelector;
