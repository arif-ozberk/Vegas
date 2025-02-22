// Vegas Database
import vegas_database from "./supabaseClient";

// Backup Mock History
import { rouletteMockHistory, coinFlipMockHistoy } from "../mocks/GameHistory";


const fetchGameHistoryData = async (gameName, setHistoryData) => {
    const { data, error } = await vegas_database
        .from("game_history")
        .select()
        .eq("game_name", gameName)
        .single()

    if (error) {
        console.log(error);
    }

    if (data) {
        switch (gameName) {
            case "roulette":
                if ((data.history_data.rouletteHistory).length < 8) {
                    setHistoryData(rouletteMockHistory);
                    return;
                }

                setHistoryData(data.history_data.rouletteHistory);
                break

            case "coin flip":
                if ((data.history_data.coinFlipHistory).length < 8) {
                    setHistoryData(coinFlipMockHistoy);
                    return;
                }

                setHistoryData(data.history_data.coinFlipHistory);
                break
        }
    }
}


const updateGameHistoryData = async (gameName, historyData) => {

    let newHistoryData = {}

    switch (gameName) {
        case "roulette":
            newHistoryData = {
                rouletteHistory: historyData
            }
            break

        case "coin flip":
            newHistoryData = {
                coinFlipHistory: historyData
            }
            break
    }


    const { data, error } = await vegas_database
        .from("game_history")
        .update({ history_data: newHistoryData })
        .select()
        .eq("game_name", gameName)
    
    if (error) {
        console.log(error);
    }
}


export default { fetchGameHistoryData, updateGameHistoryData }