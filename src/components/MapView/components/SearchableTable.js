import React, { useState, useEffect } from 'react';
import { COLORS } from '../styles/colors';
import { tableStyles } from '../styles';

const GroupHeader = ({
  title,
  count,
  isExpanded,
  onToggle,
  isVisible,
  onVisibilityToggle,
  style
}) => (
  <div
    onClick={onToggle}
    style={{
      ...tableStyles.groupHeader,
      ...style
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onVisibilityToggle();
        }}
        style={{
          padding: '4px 8px',
          width: '50px',
          backgroundColor: isVisible ? COLORS.UI.BACKGROUND.LIGHTER : COLORS.UI.BACKGROUND.DARK_GRAY,
          color: isVisible ? COLORS.UI.TEXT.BLACK : COLORS.UI.TEXT.WHITE,
          boxShadow: `0 1px 2px ${COLORS.UI.SHADOW.DARK}`,
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '12px',
          transition: 'all 0.2s ease'
        }}
      >
        {isVisible ? 'Show' : 'Hiden'}
      </button>
      <span>{title} ({count})</span>
    </div>
    <span style={{ transform: `rotate(${isExpanded ? 180 : 0}deg)`, transition: 'transform 0.2s' }}>▼</span>
  </div>
);

const SearchableTable = ({
  sampleLocations,
  pendingLocations,
  reviewedLocations,
  onLocationClick,
  selectedRow,
  onDeleteLocations,
  onApproveLocations,
  isLoggedIn,
  isAdmin,
  expandedGroups,
  setExpandedGroups,
  groupVisibility,
  setGroupVisibility,
  shouldScroll,
  setShouldScroll
}) => {
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [lastSelectedIndex, setLastSelectedIndex] = useState(null);
  const [searchColumn, setSearchColumn] = useState('parcel');
  const [searchText, setSearchText] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [showApproveConfirm, setShowApproveConfirm] = useState(null);

  const handleRowClick = (location, index, group) => {
    console.log('Table row clicked:', { location, index, group });
    console.log('Current selectedRow:', selectedRow);
    const newRowId = `${group}-${location._id}`;
    console.log('New row ID:', newRowId);
    onLocationClick(location, newRowId);
  };

  useEffect(() => {
    console.log('Selected row changed:', selectedRow);
    console.log('Should scroll:', shouldScroll);

    if (!shouldScroll) {
      console.log('Skipping scroll since shouldScroll is false');
      return;
    }

    if (selectedRow) {
      const [group] = selectedRow.split('-');
      console.log('Attempting to scroll to group:', group);

      // First ensure the group is expanded
      if (!expandedGroups[group]) {
        console.log('Expanding group:', group);
        setExpandedGroups(prev => ({ ...prev, [group]: true }));
      }

      // Create a single timeout for scrolling
      const timeoutId = setTimeout(() => {
        const element = document.getElementById(`row-${selectedRow}`);
        console.log('Found element:', element);
        if (element) {
          // Force a style update to ensure highlighting
          element.style.backgroundColor = COLORS.UI.BACKGROUND.SELECTED;

          const container = element.closest('div[style*="overflow: auto"]');
          console.log('Found container:', container);
          if (container) {
            // First scroll the container to make sure the group header is visible
            const groupHeader = document.querySelector(`[data-group="${group}"]`);
            if (groupHeader) {
              groupHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            // Calculate if element is fully visible
            const elementRect = element.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            const isFullyVisible =
              elementRect.top >= containerRect.top &&
              elementRect.bottom <= containerRect.bottom;

            if (!isFullyVisible) {
              // Scroll the element into view with some padding
              element.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
              });
            }
          }
        }
        // Don't reset shouldScroll immediately to allow for smooth scrolling
        setTimeout(() => setShouldScroll(false), 1000);
      }, 200);

      // Cleanup function to clear the timeout
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [selectedRow, expandedGroups, shouldScroll]);

  const handleCheckboxClick = (e, location, group) => {
    e.stopPropagation(); // Prevent row click when clicking checkbox
    const rowId = `${group}-${location._id}`;
    const newSelectedRows = new Set(selectedRows);

    if (newSelectedRows.has(rowId)) {
      newSelectedRows.delete(rowId);
    } else {
      newSelectedRows.add(rowId);
    }

    setSelectedRows(newSelectedRows);
  };

  const toggleGroup = (group) => {
    console.log('Toggling group:', group);
    setExpandedGroups(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  const searchableColumns = [
    { value: 'parcel', label: '地號' },
    { value: 'designer', label: '設計人' },
    { value: 'constructionCompany', label: '建設公司' },
    { value: 'landUseZone', label: '土地使用分區' },
  ];

  const filterLocations = (locationList) => {
    return locationList.filter(location => {
      const searchValue = location[searchColumn]?.toString().toLowerCase() || '';
      return searchValue.includes(searchText.toLowerCase());
    });
  };

  const renderGroup = (title, locations, groupKey, headerStyle = {}) => {
    const filteredData = filterLocations(locations);
    const isExpanded = expandedGroups[groupKey];

    // Get the background color based on group type
    let backgroundColor;
    let textColor = COLORS.UI.TEXT.WHITE;
    let textShadow = `0 1px 2px ${COLORS.UI.SHADOW.DARK}`;

    switch (groupKey) {
      case 'reviewed':
        backgroundColor = COLORS.MARKERS.REVIEWED;
        break;
      case 'pending':
        backgroundColor = COLORS.MARKERS.PENDING;
        textColor = COLORS.UI.TEXT.PRIMARY;
        textShadow = 'none';
        break;
      case 'sample':
        backgroundColor = COLORS.MARKERS.SAMPLE;
        break;
      default:
        backgroundColor = COLORS.UI.BACKGROUND.LIGHT;
        textColor = COLORS.UI.TEXT.PRIMARY;
        textShadow = 'none';
    }

    return (
      <div style={tableStyles.groupContainer}>
        <GroupHeader
          title={title}
          count={locations.length}
          isExpanded={isExpanded}
          onToggle={() => toggleGroup(groupKey)}
          isVisible={groupVisibility[groupKey]}
          onVisibilityToggle={() => setGroupVisibility(prev => ({ ...prev, [groupKey]: !prev[groupKey] }))}
          style={{
            backgroundColor,
            color: textColor,
            textShadow
          }}
        />
        <div style={{
          transition: 'max-height 0.2s ease',
          maxHeight: isExpanded ? '2000px' : '0px',
          opacity: isExpanded ? 1 : 0,
          overflow: 'hidden'
        }}>
          <div style={{
            ...tableStyles.tableWrapper,
            transition: 'all 0.3s ease'
          }}>
            <table style={tableStyles.table}>
              <thead style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: COLORS.UI.BACKGROUND.WHITE }}>
                <tr>
                  <th style={{
                    ...tableStyles.header,
                    ...tableStyles.checkboxCell,
                    backgroundColor: COLORS.UI.BACKGROUND.HEADER
                  }}>
                    {groupKey !== 'sample' && (
                      <input
                        type="checkbox"
                        checked={filteredData.every(loc => selectedRows.has(`${groupKey}-${loc._id}`))}
                        onChange={(e) => {
                          const newSelectedRows = new Set(selectedRows);
                          if (e.target.checked) {
                            filteredData.forEach(loc => newSelectedRows.add(`${groupKey}-${loc._id}`));
                          } else {
                            filteredData.forEach(loc => newSelectedRows.delete(`${groupKey}-${loc._id}`));
                          }
                          setSelectedRows(newSelectedRows);
                        }}
                      />
                    )}
                  </th>
                  <th style={{ ...tableStyles.header, backgroundColor: COLORS.UI.BACKGROUND.HEADER }}>地號</th>
                  <th style={{ ...tableStyles.header, backgroundColor: COLORS.UI.BACKGROUND.HEADER }}>設計人</th>
                  <th style={{ ...tableStyles.header, backgroundColor: COLORS.UI.BACKGROUND.HEADER }}>建設公司</th>
                  <th style={{ ...tableStyles.header, backgroundColor: COLORS.UI.BACKGROUND.HEADER }}>土地使用分區</th>
                  <th style={{ ...tableStyles.header, backgroundColor: COLORS.UI.BACKGROUND.HEADER }}>地上層數</th>
                  <th style={{ ...tableStyles.header, backgroundColor: COLORS.UI.BACKGROUND.HEADER }}>地下層數</th>
                  <th style={{ ...tableStyles.header, backgroundColor: COLORS.UI.BACKGROUND.HEADER }}>太陽光電</th>
                  <th style={{ ...tableStyles.header, backgroundColor: COLORS.UI.BACKGROUND.HEADER }}>通用化浴廁</th>
                  <th style={{ ...tableStyles.header, backgroundColor: COLORS.UI.BACKGROUND.HEADER }}>通用化交誼廳</th>
                  <th style={{ ...tableStyles.header, backgroundColor: COLORS.UI.BACKGROUND.HEADER }}>通用化昇降機</th>
                  <th style={{ ...tableStyles.header, backgroundColor: COLORS.UI.BACKGROUND.HEADER }}>景觀陽臺</th>
                  <th style={{ ...tableStyles.header, backgroundColor: COLORS.UI.BACKGROUND.HEADER }}>雨水貯集</th>
                  <th style={{ ...tableStyles.header, backgroundColor: COLORS.UI.BACKGROUND.HEADER }}>屋前綠能設施</th>
                  <th style={{ ...tableStyles.header, backgroundColor: COLORS.UI.BACKGROUND.HEADER }}>屋後綠能設施</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((location, index) => {
                  const rowId = `${groupKey}-${location._id}`;
                  const isSelected = selectedRow === rowId;
                  const isChecked = selectedRows.has(rowId);
                  return (
                    <tr
                      key={rowId}
                      id={`row-${rowId}`}
                      style={{
                        ...tableStyles.row,
                        backgroundColor: isSelected || isChecked ? COLORS.UI.BACKGROUND.SELECTED : 'transparent',
                        cursor: 'pointer'
                      }}
                      onClick={() => handleRowClick(location, index, groupKey)}
                    >
                      <td style={{
                        ...tableStyles.cell,
                        ...tableStyles.checkboxCell
                      }}>
                        {groupKey !== 'sample' && (
                          <input
                            type="checkbox"
                            checked={selectedRows.has(`${groupKey}-${location._id}`)}
                            onChange={(e) => handleCheckboxClick(e, location, groupKey)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        )}
                      </td>
                      <td style={tableStyles.cell}>{location.parcel}</td>
                      <td style={tableStyles.cell}>{location.designer || '-'}</td>
                      <td style={tableStyles.cell}>{location.constructionCompany || '-'}</td>
                      <td style={tableStyles.cell}>{location.landUseZone || '-'}</td>
                      <td style={tableStyles.cell}>{location.aboveGroundFloors || '-'}</td>
                      <td style={tableStyles.cell}>{location.undergroundFloors || '-'}</td>
                      <td style={tableStyles.cell}>{location.solarPower || '-'}</td>
                      <td style={tableStyles.cell}>{location.universalBathroom || '-'}</td>
                      <td style={tableStyles.cell}>{location.universalCommonRoom || '-'}</td>
                      <td style={tableStyles.cell}>{location.universalElevator || '-'}</td>
                      <td style={tableStyles.cell}>{location.landscapeBalcony || '-'}</td>
                      <td style={tableStyles.cell}>{location.rainwaterCollection || '-'}</td>
                      <td style={tableStyles.cell}>{location.frontGreenEnergy || '-'}</td>
                      <td style={tableStyles.cell}>{location.backGreenEnergy || '-'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {groupKey !== 'sample' && renderActionButtons(groupKey)}
        </div>
      </div>
    );
  };

  const DeleteConfirmDialog = ({ selectedRows, onClose, onConfirm }) => {
    if (!selectedRows) return null;

    return (
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: COLORS.UI.SHADOW.OVERLAY,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}
      >
        <div
          onClick={e => e.stopPropagation()}
          style={{
            backgroundColor: COLORS.UI.BACKGROUND.WHITE,
            padding: '24px',
            borderRadius: '8px',
            width: '500px',
            boxShadow: `0 4px 6px ${COLORS.UI.SHADOW.DEFAULT}`
          }}
        >
          <h3 style={{ margin: '0 0 16px 0', color: COLORS.UI.TEXT.PRIMARY }}>確認刪除</h3>
          <p style={{ margin: '0 0 24px 0', color: COLORS.UI.TEXT.SECONDARY }}>
            您確定要刪除選取的項目嗎？此操作無法復原。
          </p>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button
              onClick={onClose}
              style={{
                padding: '8px 16px',
                backgroundColor: COLORS.UI.BACKGROUND.WHITE,
                color: COLORS.UI.TEXT.PRIMARY,
                border: `1px solid ${COLORS.UI.BORDER.DEFAULT}`,
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              取消
            </button>
            <button
              onClick={onConfirm}
              style={{
                padding: '8px 16px',
                backgroundColor: COLORS.UI.DANGER,
                color: COLORS.UI.TEXT.WHITE,
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              確認刪除
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ApproveConfirmDialog = ({ selectedRows, onClose, onConfirm }) => {
    if (!selectedRows) return null;

    return (
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: COLORS.UI.SHADOW.OVERLAY,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}
      >
        <div
          onClick={e => e.stopPropagation()}
          style={{
            backgroundColor: COLORS.UI.BACKGROUND.WHITE,
            padding: '24px',
            borderRadius: '8px',
            width: '500px',
            boxShadow: `0 4px 6px ${COLORS.UI.SHADOW.DEFAULT}`
          }}
        >
          <h3 style={{ margin: '0 0 16px 0', color: COLORS.UI.TEXT.PRIMARY }}>確認審核</h3>
          <p style={{ margin: '0 0 24px 0', color: COLORS.UI.TEXT.SECONDARY }}>
            您確定要審核通過選取的項目嗎？
          </p>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button
              onClick={onClose}
              style={{
                padding: '8px 16px',
                backgroundColor: COLORS.UI.BACKGROUND.WHITE,
                color: COLORS.UI.TEXT.PRIMARY,
                border: `1px solid ${COLORS.UI.BORDER.DEFAULT}`,
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              取消
            </button>
            <button
              onClick={onConfirm}
              style={{
                padding: '8px 16px',
                backgroundColor: COLORS.MARKERS.REVIEWED,
                color: COLORS.UI.TEXT.WHITE,
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              確認審核
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderActionButtons = (groupType) => {
    if (!isLoggedIn) return null;

    const selectedRowsForGroup = Array.from(selectedRows).filter(id => id.startsWith(`${groupType}-`));
    const hasSelectedRows = selectedRowsForGroup.length > 0;

    if (!hasSelectedRows) return null;

    // Only show delete button for reviewed data if user is admin
    // For pending data, any logged in user can delete
    const canDelete = groupType === 'pending' || (groupType === 'reviewed' && isAdmin);

    return (
      <div style={{ display: 'flex', gap: '8px' }}>
        {canDelete && (
          <button
            onClick={() => setShowDeleteConfirm(selectedRowsForGroup)}
            style={tableStyles.deleteButton(false)}
          >
            刪除選取項目
          </button>
        )}

        {/* Approve button only for pending data when user is admin */}
        {groupType === 'pending' && isAdmin && (
          <button
            onClick={() => setShowApproveConfirm(selectedRowsForGroup)}
            style={{
              padding: '4px 8px',
              backgroundColor: COLORS.MARKERS.REVIEWED,
              color: COLORS.UI.TEXT.WHITE,
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            審核通過
          </button>
        )}
      </div>
    );
  };

  return (
    <div style={tableStyles.container}>
      {/* Search Inputs */}
      <div style={tableStyles.searchContainer}>
        <div style={tableStyles.searchInputsWrapper}>
          <select
            value={searchColumn}
            onChange={(e) => setSearchColumn(e.target.value)}
            style={tableStyles.searchSelect}
          >
            {searchableColumns.map(col => (
              <option key={col.value} value={col.value}>{col.label}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder={`搜尋 ${searchableColumns.find(col => col.value === searchColumn)?.label}...`}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={tableStyles.searchInput}
          />
        </div>
      </div>

      <div style={{ ...tableStyles.contentContainer, overflowY: 'visible' }}>
        {renderGroup('已審核資料', reviewedLocations, 'reviewed')}
        {renderGroup('待審核資料', pendingLocations, 'pending')}
        {renderGroup('範例資料', sampleLocations, 'sample')}
      </div>

      <DeleteConfirmDialog
        selectedRows={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(null)}
        onConfirm={() => {
          onDeleteLocations(showDeleteConfirm);
          setSelectedRows(prev => {
            const newSet = new Set(prev);
            showDeleteConfirm.forEach(id => newSet.delete(id));
            return newSet;
          });
          setShowDeleteConfirm(null);
        }}
      />

      <ApproveConfirmDialog
        selectedRows={showApproveConfirm}
        onClose={() => setShowApproveConfirm(null)}
        onConfirm={() => {
          onApproveLocations(showApproveConfirm);
          setSelectedRows(prev => {
            const newSet = new Set(prev);
            showApproveConfirm.forEach(id => newSet.delete(id));
            return newSet;
          });
          setShowApproveConfirm(null);
        }}
      />
    </div>
  );
};

export default SearchableTable; 