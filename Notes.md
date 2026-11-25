Okay, I am trying to create a mobile aplication that is intended for vendors at farmers market to be able to receive pre orders from customers. Customers will be able to create pre orders so the venders can anticipate that and have that ready. These pre orders will not be charged to the customers. This is an aplication that will be based on trust from customer to vendor. Vendors will be able to put strikes to the customers that don't meet to pick what was previously requested. I will be adding more as I go so I need something flexible as well. What application do you suggest me, we need to think about development, deployment, management and something flexible that can be used and develop. 



I also want the vendors not have access to supabase. I want the vendors be able to change their menus and products within the aplication.



We are creating Expo + React Native \_ typescript with an expo router that provides IOS/ Android Support. 







I am going to create and divide into the following ones 



&#x09;Profiles

&#x09;Vendors

&#x09;Products 

&#x09;Orders and order\_items

&#x09;pickup\_windows

&#x09;Order\_events





First thing, 

&#x09;to set up an expo app

&#x09;naviagation

&#x09;sign in

&#x09;role based screens 



&#x09;	app/

&#x20; 			(auth)/

&#x20; 			(customer)/

&#x20; 			(vendor)/

&#x09;	src/

&#x09;	  components/

&#x20; 		features/

&#x20;  	 		auth/

&#x20;   			products/

&#x20;   			orders/

&#x20;   			vendors/

&#x20;		 lib/

&#x20;   			supabase.ts

&#x20; 			types/

&#x09;		supabase/

&#x20;		 migrations/









| Use | Color | Hex |

| --- | --- | --- |

| Main background | Warm cream | `#F8F5EC` |

| Header / main title | Deep forest green | `#234735` |

| Main text | Dark green-gray | `#24362C` |

| Secondary text | Soft sage-gray | `#657267` |

| Cards / input backgrounds | Soft white | `#FFFEF9` |

| Buttons / selected states | Leaf green | `#537D4A` |

| Subtle panels / badges | Pale green | `#E4ECD9` |

| Small accent | Tomato red | `#B84E37` |

| Small accent | Harvest gold | `#F0C75E` |

