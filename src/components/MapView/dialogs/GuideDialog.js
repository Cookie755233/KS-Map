import React from 'react';
import { guideDialogStyles } from '../styles';

const GuideDialog = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div onClick={onClose} style={guideDialogStyles.overlay}>
      <div onClick={e => e.stopPropagation()} style={guideDialogStyles.container}>
        <h2 style={guideDialogStyles.title}>資料匯入指南</h2>

        <div style={guideDialogStyles.content}>
          <div style={guideDialogStyles.section}>
            <h3 style={guideDialogStyles.sectionTitle}>匯入流程</h3>
            <ul style={guideDialogStyles.list}>
              <li style={guideDialogStyles.listItem}>1. 選擇要上傳的檔案</li>
              <li style={guideDialogStyles.listItem}>2. 系統會自動偵測檔案欄位</li>
              <li style={guideDialogStyles.listItem}>3. 設定欄位對應關係</li>
              <li style={guideDialogStyles.listItem}>4. 預覽並確認資料正確性</li>
              <li style={guideDialogStyles.listItem}>5. 確認匯入後資料會進入審核狀態</li>
            </ul>
          </div>

          <div style={guideDialogStyles.section}>
            <h3 style={guideDialogStyles.sectionTitle}>必要欄位</h3>
            <ul style={guideDialogStyles.list}>
              <li style={guideDialogStyles.listItem}>緯度 (latitude) - 數值範圍: -90 到 90</li>
              <li style={guideDialogStyles.listItem}>經度 (longitude) - 數值範圍: -180 到 180</li>
              <li style={guideDialogStyles.listItem}>地號 (parcel)</li>
            </ul>
          </div>

          <div style={guideDialogStyles.section}>
            <h3 style={guideDialogStyles.sectionTitle}>選填欄位</h3>
            <ul style={guideDialogStyles.list}>
              <li style={guideDialogStyles.listItem}>設計人 (designer)</li>
              <li style={guideDialogStyles.listItem}>建設公司 (constructor)</li>
              <li style={guideDialogStyles.listItem}>土地使用分區 (landUseZone)</li>
              <li style={guideDialogStyles.listItem}>地上層數 (aboveGroundFloors)</li>
              <li style={guideDialogStyles.listItem}>地下層數 (undergroundFloors)</li>
              <li style={guideDialogStyles.listItem}>通用化浴廁 (universalBathroom) - 單位: m²</li>
              <li style={guideDialogStyles.listItem}>通用化交誼廳 (universalCommonRoom) - 單位: m²</li>
              <li style={guideDialogStyles.listItem}>通用化昇降機 (universalElevator) - 單位: m²</li>
              <li style={guideDialogStyles.listItem}>景觀陽臺 (landscapeBalcony) - 單位: m²</li>
              <li style={guideDialogStyles.listItem}>雨水貯集 (rainwaterCollection) - 單位: m³</li>
              <li style={guideDialogStyles.listItem}>屋前綠能設施 (frontGreenEnergy) - 單位: m²</li>
              <li style={guideDialogStyles.listItem}>屋後綠能設施 (backGreenEnergy) - 單位: m²</li>
              <li style={guideDialogStyles.listItem}>太陽光電 (solarPower) - 單位: kW</li>
            </ul>
          </div>

          <div style={guideDialogStyles.section}>
            <h3 style={guideDialogStyles.sectionTitle}>支援的檔案格式</h3>
            <ul style={guideDialogStyles.list}>
              <li style={guideDialogStyles.listItem}>CSV 檔案 (.csv)</li>
              <li style={guideDialogStyles.listItem}>KML 檔案 (.kml)</li>
              <li style={guideDialogStyles.listItem}>KMZ 檔案 (.kmz)</li>
            </ul>
          </div>

          <div style={guideDialogStyles.section}>
            <h3 style={guideDialogStyles.sectionTitle}>注意事項</h3>
            <ul style={guideDialogStyles.list}>
              <li style={guideDialogStyles.listItem}>請確保座標資料的正確性</li>
              <li style={guideDialogStyles.listItem}>數值欄位請使用數字格式</li>
              <li style={guideDialogStyles.listItem}>系統會自動偵測重複的座標位置</li>
              <li style={guideDialogStyles.listItem}>匯入的資料需要經過審核才會顯示在地圖上</li>
              <li style={guideDialogStyles.listItem}>請確保檔案編碼為 UTF-8 格式</li>
            </ul>
          </div>
        </div>

        <div style={guideDialogStyles.buttonContainer}>
          <button onClick={onClose} style={guideDialogStyles.closeButton}>
            關閉
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuideDialog;