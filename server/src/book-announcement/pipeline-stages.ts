export const lookUpUnwindAddFieldsProjectPipeline = [
   { 
      $lookup: {
         from: 'users',
         localField: 'saler',
         foreignField: '_id',
         as: 'newSalerData'
      }
   },
   { 
      $unwind: '$newSalerData'
   },
   {
      $addFields: {
         "saler": "$newSalerData.userName",
      }
   },
   {
      $project: {
         newSalerData: 0
      }
   }
]

