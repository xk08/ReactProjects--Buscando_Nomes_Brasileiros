import { useEffect, useState } from "react";
import customFetch from "../../../../global/Api/custom_fetch";
import { apiBaseUrlIbge } from "../../../../global/Api/api_config";

import TableThreeNamesComponent from "../../components/TableThreeNameComponent";
import TableCustomNamesComponent from "../../components/TableCustomNameComponent";
import EmptyComponent from "../../../../global/components/EmptyComponent";
import RankingFiltersComponent from "../../components/RankingFiltersComponent";
import TitleClosable from "../../../../global/components/title-closable/TitleClosable";

function RankingSection() {
  const [apiRankingCustomNames, setApiRankingCustomNames] = useState([]);
  const [apiRankingThreeNames, setApiRankingThreeNames] = useState([]);

  const [apiDataOk, setApiDataOk] = useState(false);
  const [showCustomRankingSection, setShowCustomRankingSection] = useState(true);

  const [sexChild, setSexChild] = useState("");
  const [decadeChild, setDecadeChild] = useState("");
  const [localityChild, setLocalityChild] = useState("");

  const [localitiesStatesSelectedChild, setLocalitiesStatesSelectedChild] = useState("");
  const [localitiesCitiesSelectedChild, setLocalitiesCitiesSelectedChild] = useState("");
  const [localitiesStatesChild, setLocalitiesStatesChild] = useState([]);
  const [localitiesCitiesChild, setLocalitiesCitiesChild] = useState([]);

  const [isLoadingRankingNames, setIsLoadingRankingNames] = useState(false);
  const [isLoadingLocalitiesStates, setIsLoadingLocalitiesStates] = useState(false);
  const [isLoadingLocalitiesCities, setIsLoadingLocalitiesCities] = useState(false);

  const [nRegistersState, setNRegistersState] = useState(9);
  const [nRegistersOldState, setNRegistersOldState] = useState(9);
  const [refreshPageWhenClearFilters, setRefreshPageWhenClearFilters] = useState(false);

  useEffect(() => {
    findRankingNamesInApi();
    findLocalitiesStatesInApi();
  }, [refreshPageWhenClearFilters]);

  useEffect(() => {

    const findLocalitiesCitiesInApi = async () => {

      if (localitiesStatesSelectedChild) {

        setIsLoadingLocalitiesCities(true);
        const baseUrl = `${apiBaseUrlIbge}/v1/localidades/estados/${localitiesStatesSelectedChild}/municipios`;
        let response = await customFetch(baseUrl, null, "Buscando municipios brasileiros com base na UF");

        if (response.status == 200) {
          if (response.data.length > 0) {
            setLocalitiesCitiesChild(response.data);
          } else {
            setLocalitiesCitiesChild([]);
          }
        } else {
          setLocalitiesCitiesChild([]);
        }
        setIsLoadingLocalitiesCities(false);
      }

    };
    findLocalitiesCitiesInApi();
  }, [localitiesStatesSelectedChild]);

  const handleShowSectionTopCustomsNames = () => {
    setShowCustomRankingSection(!showCustomRankingSection);
  };

  const handleChangeSexChild = (e) => {
    setSexChild(e.target.value);
  };

  const handleChangeDecadeChild = (e) => {
    setDecadeChild(e.target.value);
  };

  const handleChangeNRegistersChild = (e) => {
    setNRegistersState(e.target.value);
  };

  const handleChangeLocalityChild = (e) => {
    setLocalityChild(e.target.value);
  };

  const handleChangeLocalitiesStatesSelectedChild = (e) => {
    setLocalitiesStatesSelectedChild(e.target.value);
    handleChangeLocalityChild(e);
  };

  const handleChangeLocalitiesCitiesSelectedChild = (e) => {
    setLocalitiesCitiesSelectedChild(e.target.value);
    handleChangeLocalityChild(e);
  };

  const handleClearRankingChildrenFilters = () => {
    setSexChild("");
    setDecadeChild("");
    setLocalityChild("");
    setLocalitiesStatesSelectedChild("");
    setLocalitiesCitiesSelectedChild("");
    setNRegistersState(9);
    handleExecuteFilterInsideComponent("", "", "", 9);
    setRefreshPageWhenClearFilters(!refreshPageWhenClearFilters);
  };

  const verifyStatesAndDisableButton = () => {
    return sexChild || decadeChild || localityChild || nRegistersState !== 9 ? false : true;
  };

  const findLocalitiesStatesInApi = async () => {
    setIsLoadingLocalitiesStates(true);
    const baseUrl = `${apiBaseUrlIbge}/v1/localidades/estados`;
    let response = await customFetch(baseUrl, null, "Buscando estados brasileiros [UFs]");

    if (response.status == 200) {
      if (response.data.length > 0) {
        setLocalitiesStatesChild(response.data);
      } else {
        setLocalitiesStatesChild([]);
      }
    } else {
      setLocalitiesStatesChild([]);
    }
    setIsLoadingLocalitiesStates(false);
  };

  const handleExecuteFilterInsideComponent = async (sex, decade, locality, registersQtd) => {
    setNRegistersOldState(registersQtd);

    if (sex && decade && locality) {
      await findRankingNamesInApi("sex&decade&locality");
    } else if (decade && locality) {
      await findRankingNamesInApi("decade&locality");
    } else if (sex && locality) {
      await findRankingNamesInApi("sex&locality");
    } else if (sex && decade) {
      await findRankingNamesInApi("sex&decade");
    } else if (locality) {
      await findRankingNamesInApi("locality");
    } else if (decade) {
      await findRankingNamesInApi("decade");
    } else if (sex) {
      await findRankingNamesInApi("sex");
    } else {
      await findRankingNamesInApi();
    }
  };

  const findRankingNamesInApi = async (filter) => {
    setIsLoadingRankingNames(true);
    const baseUrl = defineBaseUrlBasedOnFilters(filter);
    let response = await customFetch(baseUrl, null, "Buscando o Ranking de Nomes");

    setTimeout(async () => {
      if (response.status == 200 || response.status == 201) {
        if (response.data.length > 0) {
          defineFilters(response.data[0].res ?? []);
        } else {
          setApiDataOk(false);
        }
      } else {
        setApiDataOk(false);
      }
      setIsLoadingRankingNames(false);
    }, 1300);
  };

  const defineBaseUrlBasedOnFilters = (filter) => {
    let baseUrlWithFilterSeted = "";

    switch (filter) {
      case "sex":
        baseUrlWithFilterSeted = `${apiBaseUrlIbge}/v2/censos/nomes/ranking/?sexo=${sexChild}`;
        break;

      case "decade":
        baseUrlWithFilterSeted = `${apiBaseUrlIbge}/v2/censos/nomes/ranking/?decada=${decadeChild}`;
        break;

      case "locality":
        baseUrlWithFilterSeted = `${apiBaseUrlIbge}/v2/censos/nomes/ranking/?localidade=${localityChild}`;
        break;

      case "sex&decade":
        baseUrlWithFilterSeted = `${apiBaseUrlIbge}/v2/censos/nomes/ranking/?sexo=${sexChild}&decada=${decadeChild}`;
        break;

      case "sex&locality":
        baseUrlWithFilterSeted = `${apiBaseUrlIbge}/v2/censos/nomes/ranking/?sexo=${sexChild}&localidade=${localityChild}`;
        break;

      case "decade&locality":
        baseUrlWithFilterSeted = `${apiBaseUrlIbge}/v2/censos/nomes/ranking/?decada=${decadeChild}&localidade=${localityChild}`;
        break;

      case "sex&decade&locality":
        baseUrlWithFilterSeted = `${apiBaseUrlIbge}/v2/censos/nomes/ranking/?sexo=${sexChild}&decada=${decadeChild}&localidade=${localityChild}`;
        break;

      default:
        baseUrlWithFilterSeted = `${apiBaseUrlIbge}/v2/censos/nomes/ranking/`;
        break;
    }
    return baseUrlWithFilterSeted;
  };

  const defineFilters = (responseDataApi) => {
    try {
      setApiRankingCustomNames(responseDataApi.filter((data) => data.ranking >= 1 && data.ranking <= nRegistersState));
      setApiRankingThreeNames(responseDataApi.filter((data) => data.ranking >= 1 && data.ranking <= 3));
      setApiDataOk(true);
    } catch (_) {
      setApiDataOk(false);
    }
  };

  return (
    <>
      <br />
      {/* TOP 3 NOMES BRASILEIROS*/}
      <TableThreeNamesComponent
        apiRankingThreeNames={apiRankingThreeNames}
        apiDataOk={apiDataOk}
        isLoading={isLoadingRankingNames} />

      <br />
      <br />

      {apiDataOk ? (
        <RankingFiltersComponent
          sex={sexChild}
          decade={decadeChild}
          locality={localityChild}
          localitiesStates={localitiesStatesChild}
          localitiesCities={localitiesCitiesChild}
          localitiesStatesSelected={localitiesStatesSelectedChild}
          localitiesCitiesSelected={localitiesCitiesSelectedChild}
          nRegistersState={nRegistersState}
          handleChangeSex={handleChangeSexChild}
          handleChangeDecade={handleChangeDecadeChild}
          handleChangeNRegisters={handleChangeNRegistersChild}
          handleChangeLocality={handleChangeLocalityChild}
          handleChangeLocalitiesStatesSelected={handleChangeLocalitiesStatesSelectedChild}
          handleChangeLocalitiesCitiesSelected={handleChangeLocalitiesCitiesSelectedChild}
          handleClearRankingChildrenFilters={handleClearRankingChildrenFilters}
          isLoadingLocalitiesStates={isLoadingLocalitiesStates}
          isLoadingLocalitiesCities={isLoadingLocalitiesCities}
          disabled={verifyStatesAndDisableButton()}
          fnOnClick={() => handleExecuteFilterInsideComponent(sexChild, decadeChild, localityChild, nRegistersState)}
        />
      ) : (
        <EmptyComponent />
      )}

      <br />

      {apiDataOk ? (
        <>
          <br />

          <TitleClosable
            verify={showCustomRankingSection}
            title="Top 10 nomes brasileiros"
            onClick={handleShowSectionTopCustomsNames}
          />
        </>
      ) : (
        <EmptyComponent />
      )}

      {/* TOP CUSTOM NOMES BRASILEIROS*/}
      {showCustomRankingSection ? (
        <>
          <br />

          <TableCustomNamesComponent
            apiRankingCustomNames={apiRankingCustomNames}
            apiDataOk={apiDataOk}
            isLoading={isLoadingRankingNames}
            nRegisters={nRegistersOldState}
            handleShowSectionTopCustomsNames={handleShowSectionTopCustomsNames}
          />
        </>
      ) : (
        <EmptyComponent />
      )}
    </>
  );
}

export default RankingSection;
