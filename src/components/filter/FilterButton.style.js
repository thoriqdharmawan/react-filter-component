import {KeyboardDatePicker} from '@material-ui/pickers'
import styled from 'styled-components'

export const ListFilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 218px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  z-index: 1;

  .list-item {
    display: flex;
    flex-direction: column;
    padding: 10px 0px;
    min-height: 180px;
  }

  .footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-top: solid 1px #eff2f4;
    padding: 11px 14px;

    .btn {
      line-height: 18px;
      font-size: 12px;
      cursor: pointer;
      border: none;
    }

    .reset-all {
      color: #000;
    }

    .action {
      display: flex;
      flex-direction: row;
      align-items: center;
      .cancel {
        color: #a9a8a8;
        margin-right: 15px;
      }

      .apply {
        color: #039be5;
      }
    }
  }
`
export const ItemFilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => (props.active ? '#014a62' : '#fff')};
  font-size: 12px;
  padding: 0px 14px;
  cursor: pointer;
  height: 30px;

  .name {
    color: ${props => (props.active ? '#fff' : '#000')};
    padding: 0px;
    margin: 0px;
  }

  .count {
    display: ${props => (props.count === 0 || !props.count ? 'none' : 'flex')};
    border-radius: 24px;
    background-color: ${props =>
      !props.active && props.count && props.count !== 0 ? '#014a62' : '#fff'};
    color: ${props => (props.active ? '#014a62' : '#fff')};
    padding: 2px 7px;
  }
`
export const TypeFilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 274px;
  background-color: #f7f8f9;
  padding: 10px 0px;
`
export const CheckboxTypeWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .action {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0px 17px;
    margin-bottom: 8px;

    .btn {
      cursor: pointer;
    }

    .select-all {
      color: #000;
      font-size: 12px;
      font-weight: 600;
    }

    .reset {
      color: #a9a8a8;
      font-size: 12px;
    }
  }

  .list-checkbox {
    display: flex;
    flex-direction: column;
    // height: ${props => props.height + 70}px;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 4px;
    }
    ::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.16);
      border-radius: 5px;
    }

    .empty-list {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 34px;
      font-size: 12px;
    }
  }
  .more-text {
    color: #a9a8a8;
    font-size: 12px;
    padding: 4px 12px 6px;
    font-style: italic;
  }
  .divider {
    border-top: 1px solid #e5e5e5;
    margin: 8px 14px 14px;
  }
`
export const DateTypeWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .action {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0px 17px;
    margin-bottom: 8px;

    .btn {
      cursor: pointer;
    }

    .select-all {
      color: #000;
      font-size: 12px;
      font-weight: 600;
    }

    .reset {
      color: #a9a8a8;
      font-size: 12px;
    }
  }

  .label {
    font-size: 12px;
    margin: 9px 17px 6px 17px;
  }
`
export const AgeTypeWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .action {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0px 17px;
    margin-bottom: 12px;

    .btn {
      cursor: pointer;
    }

    .select-all {
      color: #000;
      font-size: 12px;
      font-weight: 600;
    }

    .reset {
      color: #a9a8a8;
      font-size: 12px;
    }
  }

  .content {
    padding: 0px 17px;
    .text-field {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      color: #a9a8a8;
      .strip {
        margin-top: 12px;
      }
      .input {
        width: 43%;
        .wrapper-input {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
    }
  }

  .label {
    font-size: 12px;
    margin: 9px 17px 6px 17px;
  }
`

export const KeyboardDatePickerStyled = styled(KeyboardDatePicker)`
  & > div {
    padding-right: ${props => props.space};
  }
`
