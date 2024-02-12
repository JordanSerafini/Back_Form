// Importations correctes
import { Request, Response } from 'express';
import client from '../database/client'; 

const swapController = {
  async fetchDataFromMSSQL(req: Request, res: Response) {
    try {
      await client.connectDatabase();
      const query = `SELECT * FROM item`; 
      const tables = await client.executeQuery(query);
      console.log(tables);
      return res.status(200).json({ data: tables }); 
    } catch (err) {
      console.error("Error fetching data from MSSQL:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default swapController;




/*
async function insertDataIntoPostgreSQL(data) {
    const client = await destinationDBpg.connect();
    try {
      await client.query('BEGIN');
      const baseInsertQuery = `
        INSERT INTO item (
          "BarCodePrice", "BarCodeWeight", "PosAddItem", "LoyaltyPoints", "CalculateLoyaltyFrom",
          "GiftVoucher", "IntrastatExcluded", "CreateCustomerProductInCustomerPark", "IsMaintenanceContract",
          "IsGuaranteeExtension", "CustomerParkCreation", "StockBookingAllowed", "AutomaticStockBooking",
          "IncludeToRecursiveReplenishment", "IncludeToFabricationReplenishment", "IncludeToSupplierReplenishment",
          "CadenceQuantity", "CadenceNumberOfDays", "DoNotAssortAssemblyRequestsWithDifferentDates", "MaximumGapDayToAssort",
          "NomenclatureAccountingTransferTypeForSale", "NomenclatureAccountingTransferTypeForPurchase", "VirtualPump", "VirtualStockValue",
          "BookedQuantity", "PurchaseBillOfQuantitiesProgram_KeepActiveFromQuoteToOrder", "NotOnMarket", "PurchaseUnitPriceProgram_KeepActiveFromQuoteToOrder",
          "CanBePartiallyDelivered", "Caption", "Oxatis_Oxatis_HandlingSurcharge1ST", "Oxatis_Oxatis_HandlingSurchargeOthers", "InterventionDurationEqualsQuantity",
          "Height", "Width", "Length", "Oxatis_Oxatis_UseSubFamilyAsBrand", "IsManagedByCounterMark", "IsCounterMarkForced",
          "SalePurchaseConversionRate", "LimitDateMode", "LimitDateSafetyDelay", "UniqueId", "PurchasePrice", "ChargeRate", "ChargeAmount",
          "CostPrice", "InterestRate", "InterestAmount", "SalePriceVatExcluded", "BrandRate", "VatAmount", "SalePriceVatIncluded",
          "ManageStock", "RealStock", "Pump", "StockValue", "OrderedQuantity", "SuppliersOrderedQuantity", "VirtualStock", "DefaultQuantity",
          "Volume", "Weight", "NetWeight", "ComponentsPurchasePrice", "ComponentsCostPrice", "ComponentsSalePriceVatExcluded", "ComponentsSalePriceVatIncluded",
          "PrintComponentDetail", "AssemblingVirtualQuantity", "DisassemblingQuantity", "QuantityUsedToAssemblate", "QuantityFromDisassembling",
          "AllowNegativeStock", "UseComponentVat", "ApplyPriceListOnComponents", "ActiveState", "AdvisedSalePriceVATExcluded", "SetItemSalePriceWithAdvisedSalePrice",
          "TrackingMode", "AllowComponentsModification", "AllowPublishOnWeb", "ImageVersion", "PriceDecimalNumber", "IsHumanServicesIncludedInAttestation",
          "Oxatis_Oxatis_ShowInStockNote", "Oxatis_Oxatis_ShowStockLevel", "Oxatis_Oxatis_ShowIfOutOfStock", "Oxatis_Oxatis_SaleIfOutOfStock",
          "Oxatis_Oxatis_SaleIfOutOfStockScenario", "Oxatis_Oxatis_ShowDaysToship", "Oxatis_Oxatis_ShipPrice", "Oxatis_Oxatis_DaysToship",
          "Oxatis_Oxatis_UserMainSupplierDaysToship", "Id", "ItemType", "BillOfQuantitiesProgram_KeepActiveFromQuoteToOrder",
          "SaleUnitPriceProgram_KeepActiveFromQuoteToOrder", "UpdateComponentsStockInFabrication", "CustomersDeliveryOrderPreparingQuantity",
          "CustomersReturnOrderPreparingQuantity", "SuppliersDeliveryOrderPreparingQuantity", "SuppliersReturnOrderPreparingQuantity",
          "StockBillOfQuantitiesProgram_KeepActiveFromQuoteToOrder", "PurchaseChargesRate", "PosIsScale", "PosTare", "BillOfQuantitiesProgram_Program",
          "ReplenishmentDeliveryAddressType", "SaleUnitPriceProgram_Program", "DesCom", "DesComClear", "ItemImage", "BarCode", "UnitId", "FamilyId",
          "SubFamilyId", "sysCreatedDate", "sysCreatedUser", "sysModifiedDate", "sysModifiedUser", "NotesClear", "Notes", "Oxatis_Oxatis_CategoryType1",
          "Oxatis_Oxatis_CategoryType2", "Oxatis_Oxatis_CategoryType3", "Oxatis_Oxatis_CategoryId1", "Oxatis_Oxatis_CategoryId2", "Oxatis_Oxatis_CategoryId3",
          "Oxatis_Oxatis_MetaTitle", "Oxatis_Oxatis_MetaDescription", "Oxatis_Oxatis_MetaKeywords", "Oxatis_Oxatis_Brand", "MainIntervener",
          "IntrastatNc8NomenclatureId", "Group1", "Group2", "NotPrintable", "NotIncluded", "IsFixedPrice", "NonInvoiceableType", "ComponentCalculationType",
          "ReplacementItem", "WeightUnitId", "NumberOfItemByPackage", "VolumeUnitId", "SupplierId", "EcotaxId", "StockDestination", "StockVarianceAccount",
          "CurrentStockAccount", "VatId", "sysRecordVersion", "sysRecordVersionId", "sysEditCounter", "LimitDateSafetyDelayMode", "DefaultLifeTime",
          "PurchasePriceUpdateType", "AnalyticAccounting_GridId", "PurchaseUnitId", "DimensionUnitId", "Oxatis_Oxatis_LongDescription",
          "Oxatis_Oxatis_LongDescriptionClear", "Oxatis_Oxatis_SmallImage", "PurchaseBillOfQuantitiesProgram_Program", "CatalogId", "CatalogItemId",
          "EcotaxFurnitureId", "PurchaseUnitPriceProgram_Program", "LocalizableCaption_2", "LocalizableDesCom_2", "LocalizableDesCom_Clear_2",
          "LocalizableCaption_3", "LocalizableCaption_4", "LocalizableCaption_5", "LocalizableDesCom_3", "LocalizableDesCom_Clear_3", "LocalizableDesCom_4",
          "LocalizableDesCom_Clear_4", "LocalizableDesCom_5", "LocalizableDesCom_Clear_5", "IntrastatOriginCountryId", "ParentRangeItemId",
          "RangeTypeElementId0", "RangeTypeElementId1", "RangeTypeElementId2", "RangeTypeElementId3", "RangeTypeElementId4", "DefaultAllowedStorehouseId",
          "MaintenanceContractTemplateId", "GuaranteeTypeId", "StockBillOfQuantitiesProgram_Program", "PosThumbnail", "GiftVoucherCashValue",
          "GiftVoucherValidityDuration", "IsExtraFee", "TimeUnitId", "TechnicalDesCom", "TechnicalDesComClear", "LocalizableTechnicalDesCom_2",
          "LocalizableTechnicalDesCom_Clear_2", "LocalizableTechnicalDesCom_3", "LocalizableTechnicalDesCom_Clear_3", "LocalizableTechnicalDesCom_4",
          "LocalizableTechnicalDesCom_Clear_4", "LocalizableTechnicalDesCom_5", "LocalizableTechnicalDesCom_Clear_5", "CompetenceId", "EquipmentTypeId",
          "ScheduleEventTemplateId", "CompetenceNumberToPlan", "EquipmentTypeNumberToPlan", "CadenceDuration", "CadenceDurationType", "CadenceDurationQuantity",
          "InstallationTime", "LabourCode", "AutoUpdateLabourPrice", "IsEquipment", "InstallationCalculationType", "MaterialPrices_PurchasePrice",
          "MaterialPrices_ChargeRate", "MaterialPrices_ChargeAmount", "MaterialPrices_CostPrice", "MaterialPrices_InterestRate", "MaterialPrices_InterestAmount",
          "MaterialPrices_SalePriceVatExcluded", "MaterialPrices_BrandRate", "MaterialPrices_VatId", "MaterialPrices_VatAmount", "MaterialPrices_SalePriceVatIncluded",
          "MaterialPrices_AdvisedSalePriceVATExcluded", "MaterialPrices_SetItemSalePriceWithAdvisedSalePrice", "MaterialPrices_IsFixedPrice", "MaterialPrices_EcotaxFurnitureId",
          "LabourPrices_PurchasePrice", "LabourPrices_ChargeRate", "LabourPrices_ChargeAmount", "LabourPrices_CostPrice", "LabourPrices_InterestRate",
          "LabourPrices_InterestAmount", "LabourPrices_SalePriceVatExcluded", "LabourPrices_BrandRate", "LabourPrices_VatId", "LabourPrices_VatAmount",
          "LabourPrices_SalePriceVatIncluded", "LabourPrices_AdvisedSalePriceVATExcluded", "LabourPrices_SetItemSalePriceWithAdvisedSalePrice",
          "LabourPrices_IsFixedPrice", "LabourPrices_EcotaxFurnitureId", "CanBePartiallyInvoiced", "PickMovementDisallowedOnTotallyBookedItem",
          "SalePriceModifiedDate", "SalePriceModifiedUserId", "TarifeoCode", "TarifeoFullCode", "TarifeoProducerId", "ProducerName", "TarifeoPriceDate",
          "TarifeoPriceVersion", "TarifeoUpdateDateTIme", "IsSubscription", "SubscriptionPassings", "SubscriptionTotalCostPrice", "SubscriptionTotalPurchasePrice",
          "SubscriptionTotalSalePriceVatExcluded", "SubscriptionValidityDuration"
        ) VALUES `;
        
      const placeholders = [];
      let placeholderIndex = 1;
  
      for (const item of data) {
        const values = [
          item.BarCodePrice, item.BarCodeWeight, item.PosAddItem, item.LoyaltyPoints, item.CalculateLoyaltyFrom,
          item.GiftVoucher, item.IntrastatExcluded, item.CreateCustomerProductInCustomerPark, item.IsMaintenanceContract,
          item.IsGuaranteeExtension, item.CustomerParkCreation, item.StockBookingAllowed, item.AutomaticStockBooking,
          item.IncludeToRecursiveReplenishment, item.IncludeToFabricationReplenishment, item.IncludeToSupplierReplenishment,
          item.CadenceQuantity, item.CadenceNumberOfDays, item.DoNotAssortAssemblyRequestsWithDifferentDates, item.MaximumGapDayToAssort,
          item.NomenclatureAccountingTransferTypeForSale, item.NomenclatureAccountingTransferTypeForPurchase, item.VirtualPump, item.VirtualStockValue,
          item.BookedQuantity, item.PurchaseBillOfQuantitiesProgram_KeepActiveFromQuoteToOrder, item.NotOnMarket, item.PurchaseUnitPriceProgram_KeepActiveFromQuoteToOrder,
          item.CanBePartiallyDelivered, item.Caption, item.Oxatis_Oxatis_HandlingSurcharge1ST, item.Oxatis_Oxatis_HandlingSurchargeOthers, item.InterventionDurationEqualsQuantity,
          item.Height, item.Width, item.Length, item.Oxatis_Oxatis_UseSubFamilyAsBrand, item.IsManagedByCounterMark, item.IsCounterMarkForced,
          item.SalePurchaseConversionRate, item.LimitDateMode, item.LimitDateSafetyDelay, item.UniqueId, item.PurchasePrice, item.ChargeRate, item.ChargeAmount,
          item.CostPrice, item.InterestRate, item.InterestAmount, item.SalePriceVatExcluded, item.BrandRate, item.VatAmount, item.SalePriceVatIncluded,
          item.ManageStock, item.RealStock, item.Pump, item.StockValue, item.OrderedQuantity, item.SuppliersOrderedQuantity, item.VirtualStock, item.DefaultQuantity,
          item.Volume, item.Weight, item.NetWeight, item.ComponentsPurchasePrice, item.ComponentsCostPrice, item.ComponentsSalePriceVatExcluded, item.ComponentsSalePriceVatIncluded,
          item.PrintComponentDetail, item.AssemblingVirtualQuantity, item.DisassemblingQuantity, item.QuantityUsedToAssemblate, item.QuantityFromDisassembling,
          item.AllowNegativeStock, item.UseComponentVat, item.ApplyPriceListOnComponents, item.ActiveState, item.AdvisedSalePriceVATExcluded, item.SetItemSalePriceWithAdvisedSalePrice,
          item.TrackingMode, item.AllowComponentsModification, item.AllowPublishOnWeb, item.ImageVersion, item.PriceDecimalNumber, item.IsHumanServicesIncludedInAttestation,
          item.Oxatis_Oxatis_ShowInStockNote, item.Oxatis_Oxatis_ShowStockLevel, item.Oxatis_Oxatis_ShowIfOutOfStock, item.Oxatis_Oxatis_SaleIfOutOfStock,
          item.Oxatis_Oxatis_SaleIfOutOfStockScenario, item.Oxatis_Oxatis_ShowDaysToship, item.Oxatis_Oxatis_ShipPrice, item.Oxatis_Oxatis_DaysToship,
          item.Oxatis_Oxatis_UserMainSupplierDaysToship, item.Id, item.ItemType, item.BillOfQuantitiesProgram_KeepActiveFromQuoteToOrder,
          item.SaleUnitPriceProgram_KeepActiveFromQuoteToOrder, item.UpdateComponentsStockInFabrication, item.CustomersDeliveryOrderPreparingQuantity,
          item.CustomersReturnOrderPreparingQuantity, item.SuppliersDeliveryOrderPreparingQuantity, item.SuppliersReturnOrderPreparingQuantity,
          item.StockBillOfQuantitiesProgram_KeepActiveFromQuoteToOrder, item.PurchaseChargesRate, item.PosIsScale, item.PosTare, item.BillOfQuantitiesProgram_Program,
          item.ReplenishmentDeliveryAddressType, item.SaleUnitPriceProgram_Program, item.DesCom, item.DesComClear, item.ItemImage, item.BarCode, item.UnitId, item.FamilyId,
          item.SubFamilyId, item.sysCreatedDate, item.sysCreatedUser, item.sysModifiedDate, item.sysModifiedUser, item.NotesClear, item.Notes, item.Oxatis_Oxatis_CategoryType1,
          item.Oxatis_Oxatis_CategoryType2, item.Oxatis_Oxatis_CategoryType3, item.Oxatis_Oxatis_CategoryId1, item.Oxatis_Oxatis_CategoryId2, item.Oxatis_Oxatis_CategoryId3,
          item.Oxatis_Oxatis_MetaTitle, item.Oxatis_Oxatis_MetaDescription, item.Oxatis_Oxatis_MetaKeywords, item.Oxatis_Oxatis_Brand, item.MainIntervener,
          item.IntrastatNc8NomenclatureId, item.Group1, item.Group2, item.NotPrintable, item.NotIncluded, item.IsFixedPrice, item.NonInvoiceableType, item.ComponentCalculationType,
          item.ReplacementItem, item.WeightUnitId, item.NumberOfItemByPackage, item.VolumeUnitId, item.SupplierId, item.EcotaxId, item.StockDestination, item.StockVarianceAccount,
          item.CurrentStockAccount, item.VatId, item.sysRecordVersion, item.sysRecordVersionId, item.sysEditCounter, item.LimitDateSafetyDelayMode, item.DefaultLifeTime,
          item.PurchasePriceUpdateType, item.AnalyticAccounting_GridId, item.PurchaseUnitId, item.DimensionUnitId, item.Oxatis_Oxatis_LongDescription,
          item.Oxatis_Oxatis_LongDescriptionClear, item.Oxatis_Oxatis_SmallImage, item.PurchaseBillOfQuantitiesProgram_Program, item.CatalogId, item.CatalogItemId,
          item.EcotaxFurnitureId, item.PurchaseUnitPriceProgram_Program, item.LocalizableCaption_2, item.LocalizableDesCom_2, item.LocalizableDesCom_Clear_2,
          item.LocalizableCaption_3, item.LocalizableCaption_4, item.LocalizableCaption_5, item.LocalizableDesCom_3, item.LocalizableDesCom_Clear_3, item.LocalizableDesCom_4,
          item.LocalizableDesCom_Clear_4, item.LocalizableDesCom_5, item.LocalizableDesCom_Clear_5, item.IntrastatOriginCountryId, item.ParentRangeItemId,
          item.RangeTypeElementId0, item.RangeTypeElementId1, item.RangeTypeElementId2, item.RangeTypeElementId3, item.RangeTypeElementId4, item.DefaultAllowedStorehouseId,
          item.MaintenanceContractTemplateId, item.GuaranteeTypeId, item.StockBillOfQuantitiesProgram_Program, item.PosThumbnail, item.GiftVoucherCashValue,
          item.GiftVoucherValidityDuration, item.IsExtraFee, item.TimeUnitId, item.TechnicalDesCom, item.TechnicalDesComClear, item.LocalizableTechnicalDesCom_2,
          item.LocalizableTechnicalDesCom_Clear_2, item.LocalizableTechnicalDesCom_3, item.LocalizableTechnicalDesCom_Clear_3, item.LocalizableTechnicalDesCom_4,
          item.LocalizableTechnicalDesCom_Clear_4, item.LocalizableTechnicalDesCom_5, item.LocalizableTechnicalDesCom_Clear_5, item.CompetenceId, item.EquipmentTypeId,
          item.ScheduleEventTemplateId, item.CompetenceNumberToPlan, item.EquipmentTypeNumberToPlan, item.CadenceDuration, item.CadenceDurationType, item.CadenceDurationQuantity,
          item.InstallationTime, item.LabourCode, item.AutoUpdateLabourPrice, item.IsEquipment, item.InstallationCalculationType, item.MaterialPrices_PurchasePrice,
          item.MaterialPrices_ChargeRate, item.MaterialPrices_ChargeAmount, item.MaterialPrices_CostPrice, item.MaterialPrices_InterestRate, item.MaterialPrices_InterestAmount,
          item.MaterialPrices_SalePriceVatExcluded, item.MaterialPrices_BrandRate, item.MaterialPrices_VatId, item.MaterialPrices_VatAmount, item.MaterialPrices_SalePriceVatIncluded,
          item.MaterialPrices_AdvisedSalePriceVATExcluded, item.MaterialPrices_SetItemSalePriceWithAdvisedSalePrice, item.MaterialPrices_IsFixedPrice, item.MaterialPrices_EcotaxFurnitureId,
          item.LabourPrices_PurchasePrice, item.LabourPrices_ChargeRate, item.LabourPrices_ChargeAmount, item.LabourPrices_CostPrice, item.LabourPrices_InterestRate,
          item.LabourPrices_InterestAmount, item.LabourPrices_SalePriceVatExcluded, item.LabourPrices_BrandRate, item.LabourPrices_VatId, item.LabourPrices_VatAmount,
          item.LabourPrices_SalePriceVatIncluded, item.LabourPrices_AdvisedSalePriceVATExcluded, item.LabourPrices_SetItemSalePriceWithAdvisedSalePrice,
          item.LabourPrices_IsFixedPrice, item.LabourPrices_EcotaxFurnitureId, item.CanBePartiallyInvoiced, item.PickMovementDisallowedOnTotallyBookedItem,
          item.SalePriceModifiedDate, item.SalePriceModifiedUserId, item.TarifeoCode, item.TarifeoFullCode, item.TarifeoProducerId, item.ProducerName, item.TarifeoPriceDate,
          item.TarifeoPriceVersion, item.TarifeoUpdateDateTIme, item.IsSubscription, item.SubscriptionPassings, item.SubscriptionTotalCostPrice, item.SubscriptionTotalPurchasePrice,
          item.SubscriptionTotalSalePriceVatExcluded, item.SubscriptionValidityDuration
        ];
  
        const placeholderValues = values.map((_, i) => `$${placeholderIndex++}`);
        placeholders.push(`(${placeholderValues.join(', ')})` as string);
      }
  
      const insertQuery = baseInsertQuery + placeholders.join(', ');
      await client.query(insertQuery);
      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }

  */