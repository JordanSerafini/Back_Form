import client from "../../database/client/client";

const itemController = {

  async getSupplier(req: any, res: any) {
    try {

      await client.connectDatabase();

      const query= "SELECT * FROM Supplier ";
      const tables = await client.executeQuery(query);

      res.send(tables);

    } catch (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la récupération des données.");
    }
},

  async getDeal(req: any, res: any) {
    try {
  
      await client.connectDatabase();
  
      const query= "SELECT * FROM Deal";
      const tables = await client.executeQuery(query);
  
      res.send(tables);
  
    } catch (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la récupération des données.");
    }
  },

  async getDealItem(req: any, res: any) {
    try {
  
      await client.connectDatabase();
  
      const query= "SELECT * FROM DealItem";
      const tables = await client.executeQuery(query);
  
      res.send(tables);
  
    } catch (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la récupération des données.");
    }
  },

  async getStockDocuments(req: any, res: any) {
    try {
      await client.connectDatabase();

      const query = "SELECT * FROM StockDocument";
      const tables = await client.executeQuery(query);

      res.send(tables);
    } catch (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la récupération des données.");
    }
  },

  async getAccountingYear(req: any, res: any) {
    try {
  
      await client.connectDatabase();
  
      const query= "SELECT * FROM AccountingYear";
      const tables = await client.executeQuery(query);
  
      res.send(tables);
  
    } catch (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la récupération des données.");
    }
  },

  async getContact(req: any, res: any) {
    try {
        await client.connectDatabase();
        const query = "SELECT * FROM Contact";
        const costs = await client.executeQuery(query);
        res.send(costs);
    } catch (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la récupération des coûts de contrat de maintenance.");
    }
  },

  async saleSettlement(req: any, res: any) {
    try {
      await client.connectDatabase();

      const query = "SELECT * FROM SaleSettlement";
      const tables = await client.executeQuery(query);

      res.send(tables);
    } catch (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la récupération des données.");
    }
  },

  async test(req: any, res: any) {
    try {
      await client.connectDatabase();

      const query = "SELECT * FROM SaleSettlement";
      const tables = await client.executeQuery(query);

      res.send(tables);
    } catch (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la récupération des données.");
    }
  },
  
  async getStockDocument(req: any, res: any) {
    try {
      await client.connectDatabase();

      const query = "SELECT * FROM StockDocument";
      const tables = await client.executeQuery(query);

      res.send(tables);
    } catch (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la récupération des données.");
    }
  },
  async getEbpSysOptions(req: any, res: any) {
    try {
      await client.connectDatabase();
      const query = "SELECT * FROM EbpSysOptions";
      const tables = await client.executeQuery(query);
      res.send(tables);
    } catch (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la récupération des données EbpSysOptions.");
    }
  },
  
  async getEbpSysReportTagAssociation(req: any, res: any) {
    try {
      await client.connectDatabase();
      const query = "SELECT * FROM EbpSysReportTagAssociation";
      const tables = await client.executeQuery(query);
      res.send(tables);
    } catch (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la récupération des données EbpSysReportTagAssociation.");
    }
  },
  
  async getLoyaltyCalculationLine(req: any, res: any) {
    try {
      await client.connectDatabase();
      const query = "SELECT * FROM LoyaltyCalculationLine";
      const tables = await client.executeQuery(query);
      res.send(tables);
    } catch (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la récupération des données LoyaltyCalculationLine.");
    }
  },
  
  async getEbpSysNavBarTemplate(req: any, res: any) {
    try {
      await client.connectDatabase();
      const query = "SELECT * FROM EbpSysNavBarTemplate";
      const tables = await client.executeQuery(query);
      res.send(tables);
    } catch (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la récupération des données EbpSysNavBarTemplate.");
    }
  },
  
  async getStockItem(req: any, res: any) {
    try {
      await client.connectDatabase();
      const query = "SELECT * FROM StockItem";
      const tables = await client.executeQuery(query);
      res.send(tables);
    } catch (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la récupération des données StockItem.");
    }
  },

  async getDealContact(req: any, res: any) {
    try {
        await client.connectDatabase();
        const query = "SELECT * FROM DealContact";
        const contacts = await client.executeQuery(query);
        res.send(contacts);
    } catch (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la récupération des contacts d'affaire.");
    }
},

async getDisbursement(req: any, res: any) {
    try {
        await client.connectDatabase();
        const query = "SELECT * FROM Disbursement";
        const disbursements = await client.executeQuery(query);
        res.send(disbursements);
    } catch (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la récupération des déboursements.");
    }
},

async getPurchaseDocumentComplementaryDiscount(req: any, res: any) {
    try {
        await client.connectDatabase();
        const query = "SELECT * FROM PurchaseDocumentComplementaryDiscount";
        const discounts = await client.executeQuery(query);
        res.send(discounts);
    } catch (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la récupération des remises complémentaires sur document d'achat.");
    }
},

async getDocumentSerial(req: any, res: any) {
    try {
        await client.connectDatabase();
        const query = "SELECT * FROM DocumentSerial";
        const serials = await client.executeQuery(query);
        res.send(serials);
    } catch (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la récupération des séries de documents.");
    }
},

async getConstructionSiteReferenceDocumentEx(req: any, res: any) {
    try {
        await client.connectDatabase();
        const query = "SELECT * FROM ConstructionSiteReferenceDocumentEx";
        const documents = await client.executeQuery(query);
        res.send(documents);
    } catch (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la récupération des documents de référence de chantier (extension).");
    }
},

async getPurchaseDocumentLineAnalyticAffectation(req: any, res: any) {
  try {
      await client.connectDatabase();
      const query = "SELECT * FROM PurchaseDocumentLineAnalyticAffectation";
      const affectations = await client.executeQuery(query);
      res.send(affectations);
  } catch (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la récupération des affectations analytiques de ligne de document d'achat.");
  }
},

async getStates(req: any, res: any) {
  try {
      await client.connectDatabase();
      const query = "SELECT * FROM States";
      const states = await client.executeQuery(query);
      res.send(states);
  } catch (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la récupération des états.");
  }
},

async getEbpSysUserConnection(req: any, res: any) {
  try {
      await client.connectDatabase();
      const query = "SELECT * FROM EbpSysUserConnection";
      const connections = await client.executeQuery(query);
      res.send(connections);
  } catch (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la récupération des connexions utilisateur du système EBP.");
  }
},

async getMaintenanceContractCost(req: any, res: any) {
  try {
      await client.connectDatabase();
      const query = "SELECT * FROM MaintenanceContractCost";
      const costs = await client.executeQuery(query);
      res.send(costs);
  } catch (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la récupération des coûts de contrat de maintenance.");
  }
},

async getPriceList(req: any, res: any) {
  try {

    await client.connectDatabase();

    const query= "SELECT * FROM PriceList";
    const tables = await client.executeQuery(query);

    res.send(tables);

  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
},

async getSupplierFamilly(req: any, res: any) {
  try {

    await client.connectDatabase();

    const query= "SELECT * FROM SupplierFamily";
    const tables = await client.executeQuery(query);

    res.send(tables);

  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
},

async getSupplierSubFamilly(req: any, res: any) {
  try {

    await client.connectDatabase();

    const query= "SELECT * FROM SupplierSubFamily";
    const tables = await client.executeQuery(query);

    res.send(tables);

  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
},
  
async getConstructionSiteReferenceDocumentLine(req: any, res: any) {
  try {

    await client.connectDatabase();

    const query= "SELECT * FROM ConstructionSiteReferenceDocumentLine";
    const tables = await client.executeQuery(query);

    res.send(tables);

  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
},

async getReceipt(req: any, res: any) {
  try {

    await client.connectDatabase();

    const query= "SELECT * FROM Receipt";
    const tables = await client.executeQuery(query);

    res.send(tables);

  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
},

async getCustomerAssociatedFiles(req: any, res: any) {
  try {

    await client.connectDatabase();

    const query= "SELECT * FROM CustomerAssociatedFiles";
    const tables = await client.executeQuery(query);

    res.send(tables);

  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
},

async getDealStockDocumentLine(req: any, res: any) {
  try {

    await client.connectDatabase();

    const query= "SELECT * FROM DealStockDocumentLine";
    const tables = await client.executeQuery(query);

    res.send(tables);

  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
},

async getCustomerFamily(req: any, res: any) {
  try {

    await client.connectDatabase();

    const query= "SELECT * FROM CustomerFamily";
    const tables = await client.executeQuery(query);

    res.send(tables);

  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
},

async getAddress(req: any, res: any) {
  try {

    await client.connectDatabase();

    const query= "SELECT * FROM Address";
    const tables = await client.executeQuery(query);

    res.send(tables);

  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
},

async getSaleDocumentEx(req: any, res: any) {
  try {

    await client.connectDatabase();

    const query= "SELECT * FROM SaleDocumentEx";
    const tables = await client.executeQuery(query);

    res.send(tables);

  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
},

async getStockMovement(req: any, res: any) {
  try {

    await client.connectDatabase();

    const query= "SELECT * FROM StockMovement ";
    const tables = await client.executeQuery(query);

    res.send(tables);

  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
},

async getStockDocumentAssociatedFiles(req: any, res: any) {
  try {

    await client.connectDatabase();

    const query= "SELECT * FROM StockDocumentAssociatedFiles";
    const tables = await client.executeQuery(query);

    res.send(tables);

  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
},

async getExpense(req: any, res: any) {
  try {

    await client.connectDatabase();

    const query= "SELECT * FROM Expense";
    const tables = await client.executeQuery(query);

    res.send(tables);

  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
},

async getCustomerProductAssociatedFiles(req: any, res: any) {
  try {

    await client.connectDatabase();

    const query= "SELECT * FROM CustomerProductAssociatedFiles";
    const tables = await client.executeQuery(query);

    res.send(tables);

  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
},

async getSupplierAssociatedFiles(req: any, res: any) {
  try {

    await client.connectDatabase();

    const query= "SELECT * FROM SupplierAssociatedFiles";
    const tables = await client.executeQuery(query);

    res.send(tables);

  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
},

async getConstructionSite(req: any, res: any) {
  try {

    await client.connectDatabase();

    const query= "SELECT * FROM ConstructionSite ";
    const tables = await client.executeQuery(query);

    res.send(tables);

  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
},

// ----------------------------------------------------------------------------
async getCustomerProduct(req: any, res: any) {
  try {

    await client.connectDatabase();

    const query= "SELECT * FROM CustomerProduct  ";
    const tables = await client.executeQuery(query);

    res.send(tables);

  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
},
// ----------------------------------------------------------------------------

async getShipping(req: any, res: any) {
  try {

    await client.connectDatabase();

    const query= "SELECT * FROM Shipping  ";
    const tables = await client.executeQuery(query);

    res.send(tables);

  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
},

async getStorehouse(req: any, res: any) {
  try {

    await client.connectDatabase();

    const query= "SELECT * FROM Storehouse";
    const tables = await client.executeQuery(query);

    res.send(tables);

  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
},

 async getDealSupplier(req: any, res: any) {
    try {

      await client.connectDatabase();

      const query= "SELECT * FROM DealSupplier  ";
      const tables = await client.executeQuery(query);

      res.send(tables);

    } catch (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la récupération des données.");
    }
},

async getCashMovement(req: any, res: any) {
  try {

    await client.connectDatabase();

    const query= "SELECT * FROM CashMovement  ";
    const tables = await client.executeQuery(query);

    res.send(tables);

  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
},

async getEbpUser(req: any, res: any) {
  try {

    await client.connectDatabase();

    const query= "SELECT * FROM EbpSysUser";
    const tables = await client.executeQuery(query);

    res.send(tables);

  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
},

async getPeriodicInvoicing(req: any, res: any) {
  try {

    await client.connectDatabase();

    const query= "SELECT * FROM PeriodicInvoicing";
    const tables = await client.executeQuery(query);

    res.send(tables);

  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
},

async getPaymentType(req: any, res: any) {
  try {

    await client.connectDatabase();

    const query= "SELECT * FROM PaymentType";
    const tables = await client.executeQuery(query);

    res.send(tables);

  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
},

async getReminderLetter(req: any, res: any) {
  try {

    await client.connectDatabase();

    const query= "SELECT * FROM ReminderLetter";
    const tables = await client.executeQuery(query);

    res.send(tables);

  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
},

async getPriceListCalculationLine(req: any, res: any) {
  try {

    await client.connectDatabase();

    const query= "SELECT * FROM PriceListCalculationLine";
    const tables = await client.executeQuery(query);

    res.send(tables);

  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
},

async getEquipment(req: any, res: any) {
  try {

    await client.connectDatabase();

    const query= "SELECT * FROM Equipment";
    const tables = await client.executeQuery(query);

    res.send(tables);

  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
},

async getSupplierItem(req: any, res: any) {
  try {

    await client.connectDatabase();

    const query= "SELECT * FROM SupplierItem";
    const tables = await client.executeQuery(query);

    res.send(tables);

  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
},

async getItemFamily(req: any, res: any) {
  try {

    await client.connectDatabase();

    const query= "SELECT * FROM ItemFamily";
    const tables = await client.executeQuery(query);

    res.send(tables);

  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
},

async getMaintenanceContractFamily(req: any, res: any) {
  try {

    await client.connectDatabase();

    const query= "SELECT * FROM MaintenanceContractFamily";
    const tables = await client.executeQuery(query);

    res.send(tables);

  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
},

async getPeriodicInvoicingCustomer(req: any, res: any) {
  try {

    await client.connectDatabase();

    const query= "SELECT * FROM PeriodicInvoicingCustomer";
    const tables = await client.executeQuery(query);

    res.send(tables);

  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
},

async getTrackingStockItem(req: any, res: any) {
  try {

    await client.connectDatabase();

    const query= "SELECT * FROM TrackingStockItem";
    const tables = await client.executeQuery(query);

    res.send(tables);

  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
},

async getDealCustomer(req: any, res: any) {
  try {

    await client.connectDatabase();

    const query= "SELECT * FROM DealCustomer";
    const tables = await client.executeQuery(query);

    res.send(tables);

  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
},

async getMaintenanceContract(req: any, res: any) {
  try {

    await client.connectDatabase();

    const query= "SELECT * FROM MaintenanceContract";
    const tables = await client.executeQuery(query);

    res.send(tables);

  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
},

async getItemComponent(req: any, res: any) {
  try {

    await client.connectDatabase();

    const query= "SELECT * FROM ItemComponent";
    const tables = await client.executeQuery(query);

    res.send(tables);

  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
},

async getCustomerCustomReport(req: any, res: any) {
  try {

    await client.connectDatabase();

    const query= "SELECT * FROM CustomerCustomReport";
    const tables = await client.executeQuery(query);

    res.send(tables);

  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
},

};

export default itemController;
