import { createContext,  useEffect, useState } from "react";
import { products } from '../assets/assets'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$'
    const Delivery_Fee = 10;
    const [Search, setSearch] = useState('');
    const [ShowSearch, setShowSearch] = useState(false);
    const [CartItems, setCartItems] = useState([]);
    const Navigate = useNavigate();
    // Load language and direction from localStorage if available
    const getInitialLanguage = () => {
        return localStorage.getItem('language') || 'en';
    };
    const getInitialDirection = () => {
        return localStorage.getItem('direction') || 'ltr';
    };

    const [language, setLanguage] = useState(getInitialLanguage()); // 'en' or 'ar'
    const [direction, setDirection] = useState(getInitialDirection()); // 'ltr' or 'rtl'

    useEffect(() => {
        localStorage.setItem('language', language);
        localStorage.setItem('direction', direction);
    }, [language, direction]);

    const toggleLanguage = () => {
        if (language === 'en') {
            setLanguage('ar');
            setDirection('rtl');
        } else {
            setLanguage('en');
            setDirection('ltr');
        }
    };

    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error('Please select a size');
            return;
        }

        let cartData = structuredClone(CartItems);
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
    }

    const getCartCount = () => {
        let totalcount = 0
        for (const items in CartItems) {
            for (const item in CartItems[items]) {
                try {
                    if (CartItems[items][item] > 0) {
                        totalcount += CartItems[items][item];
                    }
                } catch (error) {
                    toast.error('Error calculating cart count');
                }
            }

        }
        return totalcount;
    }

    const getCartAmount =  () => {
        let totalAmount = 0;
        for (const items in CartItems) {
            let itemInfo = products.find(item => item._id === items);
            for (const item in CartItems[items]) {
                if (CartItems[items][item] > 0) {
                    try {
                        totalAmount += (itemInfo.price * CartItems[items][item]);
                    } catch (error) {
                        toast.error('Error calculating cart amount');
                    }

                }
            }
        }
        return totalAmount;
    }

    const UbdateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(CartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
    }

    useEffect(() => {
        console.log(CartItems);

    }, [CartItems])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const translations = {
        en: {
            // Navigation & General
            HOME: 'Home',
            ABOUT_US: 'About Us',
            DELIVERY: 'Delivery',
            PRIVACY_POLICY: 'Privacy & Policy',
            COMPANY: 'COMPANY',
            GET_IN_TOUCH: 'GET IN TOUCH',
            CONTACT: 'Contact',
            US: 'Us',
            LOGIN: 'Log In',
            MY_PROFILE: 'My Profile',
            ORDER_HISTORY: 'Order History',
            CART: 'Cart',
            COLLECTIONS: 'Collections',
            ALL: 'All',
            FILTERS: 'Filters',
            TOGGLE_FILTERS: 'Toggle filters',
            CATEGORIES: 'Categories',
            MEN: 'Men',
            WOMEN: 'Women',
            KIDS: 'Kids',
            TYPE: 'Type',
            TOPWEAR: 'Topwear',
            BOTTOMWEAR: 'Bottomwear',
            WINTERWEAR: 'Winterwear',
            SORT_BY_RELEVANT: 'Sort by: Relevant',
            SORT_BY_LOW_HIGH: 'Sort by: Low to High',
            SORT_BY_HIGH_LOW: 'Sort by: High to Low',
            NO_PRODUCTS_FOUND: 'No products found matching your filters',
            // Hero & Section Titles
            LATEST: 'Latest Arrivals',
            SUMMER_COLLECTION: 'Summer Collection',
            LIMITED_EDITIONS: 'Limited Editions',
            OUR_BEST_SELLERS: 'OUR BEST SELLERS',
            SHOP_NOW: 'Shop Now',
            VIEW_COLLECTION: 'View Collection',
            NEW_COLLECTION: 'New Collection',
            JOIN_CUSTOMERS: 'Join',
            HAPPY_CUSTOMERS: 'happy customers',
            LATEST_COLLECTIONS_DESC: 'Welcome the season with the latest designs and standout pieces. Crafted to elevate your everyday look.',
            SUMMER_COLLECTION_DESC: 'Enjoy the summer with our exclusive collection of light and trendy pieces.',
            LIMITED_EDITIONS_DESC: 'Discover our limited editions, designed for distinction and elegance.',
            BEST_SELLERS_DESC: 'Customer favorites for their quality and comfort. These are our top-selling products!',
            FOOTER_DESC: 'Elevating your experience through premium quality, thoughtful craftsmanship, and exceptional service — since 2015. From timeless classics to modern essentials, we’re dedicated to creating products that inspire confidence and last a lifetime.',
            ALL_RIGHTS: 'All Rights Reserved',
            // Policy
            EASY_EXCHANGE_POLICY: 'Easy Exchange Policy',
            EASY_EXCHANGE_POLICY_DESC: 'We offer a hassle-free exchange policy.',
            RETURN_POLICY: '7 Days Return Policy',
            RETURN_POLICY_DESC: 'We provide a 7-day free return policy.',
            CUSTOMER_SUPPORT: 'Best Customer Support',
            CUSTOMER_SUPPORT_DESC: 'We provide 24/7 customer support.',
            // Cart & Product
            YOUR: 'Your',
            ITEM: 'item',
            ITEMS: 'items',
            IN_YOUR_CART: 'in your cart',
            SIZE: 'Size',
            REMOVE: 'Remove',
            PROCEED_TO_CHECKOUT: 'Proceed to Checkout',
            EMPTY_CART: 'Empty cart',
            YOUR_CART_IS_EMPTY: 'Your cart is empty',
            LOOKS_LIKE_NOTHING_ADDED: 'Looks like you haven\'t added anything to your cart yet',
            ORDER: 'Order',
            SUMMARY: 'Summary',
            SUBTOTAL: 'Subtotal',
            SHIPPING: 'Shipping',
            TOTAL: 'Total',
            SELECT_SIZE: 'Select Size',
            ADD_TO_CART: 'Add to Cart',
            PRODUCT_POLICIES_ORIGINAL: '100% Original Products',
            PRODUCT_POLICIES_COD: 'Cash on Delivery Available',
            PRODUCT_POLICIES_RETURN: 'Easy 7-Day Returns',
            DESCRIPTION: 'Description',
            REVIEWS: 'Reviews',
            NO_REVIEWS: 'No reviews yet. Be the first to review this product!',
            QUICK_VIEW: 'Quick View',
            SALE: 'Sale',
            FREE_SHIPPING: 'Free Shipping',
            VIEW_DETAILS: 'View Details',
            ADD: 'Add',
            RATING: 'Rating',
            CLOSE: 'Close',
            // Login & Auth
            SIGN_IN: 'Sign In',
            SIGN_UP: 'Sign Up',
            WELCOME_BACK: 'Welcome Back',
            CREATE_ACCOUNT: 'Create Account',
            SIGN_IN_TO_ACCESS: 'Sign in to access your account',
            JOIN_US: 'Join us to get started',
            FULL_NAME: 'Full Name',
            EMAIL_ADDRESS: 'Email Address',
            PASSWORD: 'Password',
            PROCESSING: 'Processing...',
            DONT_HAVE_ACCOUNT: 'Don\'t have an account?',
            ALREADY_HAVE_ACCOUNT: 'Already have an account?',
            FORGOT_PASSWORD: 'Forgot your password?',
            // Place Order & Checkout
            FIRST_NAME: 'First Name',
            LAST_NAME: 'Last Name',
            EMAIL: 'Email',
            STREET_ADDRESS: 'Street Address',
            CITY: 'City',
            STATE: 'State',
            ZIPCODE: 'Zipcode',
            COUNTRY: 'Country',
            PHONE: 'Phone',
            PAYMENT: 'Payment',
            METHOD: 'Method',
            CASH_ON_DELIVERY: 'Cash on Delivery',
            PLACE_ORDER: 'Place Order',
            PROCESSING_ORDER: 'Processing order...',
            FIRST_NAME_REQUIRED: 'First name is required',
            LAST_NAME_REQUIRED: 'Last name is required',
            EMAIL_REQUIRED: 'Email is required',
            EMAIL_INVALID: 'Email is invalid',
            STREET_REQUIRED: 'Street address is required',
            CITY_REQUIRED: 'City is required',
            ZIPCODE_REQUIRED: 'Zipcode is required',
            COUNTRY_REQUIRED: 'Country is required',
            PHONE_REQUIRED: 'Phone is required',
            // About & Contact
            ABOUT: 'About',
            ABOUT_DESC1: 'Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.',
            ABOUT_DESC2: "Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.",
            OUR_MISSION_TITLE: 'Our Mission',
            OUR_MISSION_DESC: 'Our mission at Forever is to empower customers with choice, convenience, and confidence. We\'re dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.',
            WHY: 'Why',
            CHOOSE_US: 'Choose Us',
            QUALITY_ASSURANCE: 'Quality Assurance',
            QUALITY_ASSURANCE_DESC: 'We meticulously select and vet each product to ensure it meets our stringent quality standards.',
            CONVENIENCE: 'Convenience',
            CONVENIENCE_DESC: 'With our user-friendly interface and hassle-free ordering process, shopping has never been easier.',
            EXCEPTIONAL_CUSTOMER_SERVICE: 'Exceptional Customer Service',
            EXCEPTIONAL_CUSTOMER_SERVICE_DESC: 'Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.',
            CONTACT_HEADER_DESC: "We'd love to hear from you! Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions.",
            GET: 'Get',
            IN_TOUCH: 'In Touch',
            CONTACT_CARD_DESC: 'Reach out to us for any inquiries, support, or just to say hello! Our team is always happy to help you.',
            CONTACT_ADDRESS: '123 Forever Ave, Dream City, Country',
            NAME: 'Name',
            YOUR_NAME: 'Your Name',
            YOUR_EMAIL: 'Your Email',
            MESSAGE: 'Message',
            YOUR_MESSAGE: 'Your Message',
            SEND_MESSAGE: 'Send Message',
            CONTACT_THANK_YOU: 'Thank you for reaching out! We\'ll get back to you soon.',
            // Newsletter
            SUBSCRIBE_NOW: 'Subscribe Now & Get 20% off',
            SUBSCRIBE_DESC: 'Join our newsletter for exclusive offers, updates, and more!',
            THANK_YOU: 'Thank you for subscribing!',
            SUBSCRIBE: 'SUBSCRIBE',
            ENTER_EMAIL: 'Enter Your Email',
            // Misc
            REMOVE_ITEM: 'Remove item',
            PRODUCT_DESCRIPTION_1: 'An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence.',
            PRODUCT_DESCRIPTION_2: 'E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer. They typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors).',
            RELATED_PRODUCTS: 'Related Products',
            RELATED_PRODUCTS_DESC: 'You may also like these products:',
        },
        ar: {
            // Navigation & General
            HOME: 'الرئيسية',
            ABOUT_US: 'معلومات عنا',
            DELIVERY: 'التوصيل',
            PRIVACY_POLICY: 'سياسة الخصوصية',
            COMPANY: 'الشركة',
            GET_IN_TOUCH: 'تواصل معنا',
            CONTACT: 'اتصل',
            US: 'بنا',
            LOGIN: 'تسجيل الدخول',
            MY_PROFILE: 'ملفي الشخصي',
            ORDER_HISTORY: 'تاريخ الطلبات',
            CART: 'المشتريات',
            COLLECTIONS: 'المجموعات',
            ALL: 'الكل',
            FILTERS: 'الفلاتر',
            TOGGLE_FILTERS: 'تبديل الفلاتر',
            CATEGORIES: 'الفئات',
            MEN: 'رجال',
            WOMEN: 'نساء',
            KIDS: 'أطفال',
            TYPE: 'النوع',
            TOPWEAR: 'ملابس علوية',
            BOTTOMWEAR: 'ملابس سفلية',
            WINTERWEAR: 'ملابس شتوية',
            SORT_BY_RELEVANT: 'الترتيب: الأكثر صلة',
            SORT_BY_LOW_HIGH: 'الترتيب: من الأقل للأعلى',
            SORT_BY_HIGH_LOW: 'الترتيب: من الأعلى للأقل',
            NO_PRODUCTS_FOUND: 'لا توجد منتجات مطابقة للفلاتر',
            // Hero & Section Titles
            LATEST: 'أحدث المنتجات',
            SUMMER_COLLECTION: 'مجموعة الصيف',
            LIMITED_EDITIONS: 'إصدارات محدودة',
            OUR_BEST_SELLERS: 'الأكثر مبيعًا لدينا',
            SHOP_NOW: 'تسوق الآن',
            VIEW_COLLECTION: 'عرض المجموعة',
            NEW_COLLECTION: 'مجموعة جديدة',
            JOIN_CUSTOMERS: 'انضم إلى',
            HAPPY_CUSTOMERS: 'عميل سعيد',
            LATEST_COLLECTIONS_DESC: 'استقبل الموسم بأحدث التصاميم والقطع المميزة. صممت لإبراز إطلالتك اليومية.',
            SUMMER_COLLECTION_DESC: 'استمتع بالصيف مع مجموعتنا الحصرية من القطع الخفيفة والعصرية.',
            LIMITED_EDITIONS_DESC: 'اكتشف الإصدارات المحدودة لدينا، المصممة للتميز والأناقة.',
            BEST_SELLERS_DESC: 'المفضلات لدى العملاء لجودتها وراحتها. هذه المنتجات الأكثر مبيعًا!',
            FOOTER_DESC: 'نرتقي بتجربتك من خلال الجودة الفائقة والحرفية المدروسة والخدمة الاستثنائية — منذ 2015. من الكلاسيكيات الخالدة إلى الأساسيات العصرية، نحن ملتزمون بابتكار منتجات تلهم الثقة وتدوم طويلاً.',
            ALL_RIGHTS: 'جميع الحقوق محفوظة',
            // Policy
            EASY_EXCHANGE_POLICY: 'سياسة استبدال سهلة',
            EASY_EXCHANGE_POLICY_DESC: 'نقدم سياسة استبدال خالية من المتاعب.',
            RETURN_POLICY: 'سياسة إرجاع 7 أيام',
            RETURN_POLICY_DESC: 'نوفر سياسة إرجاع مجانية لمدة 7 أيام.',
            CUSTOMER_SUPPORT: 'أفضل دعم للعملاء',
            CUSTOMER_SUPPORT_DESC: 'نقدم دعمًا للعملاء على مدار الساعة.',
            // Cart & Product
            YOUR: 'سلة',
            ITEM: 'عنصر',
            ITEMS: 'عناصر',
            IN_YOUR_CART: 'في سلتك',
            SIZE: 'المقاس',
            REMOVE: 'إزالة',
            PROCEED_TO_CHECKOUT: 'إتمام الشراء',
            EMPTY_CART: 'سلة فارغة',
            YOUR_CART_IS_EMPTY: 'سلتك فارغة',
            LOOKS_LIKE_NOTHING_ADDED: 'يبدو أنك لم تضف أي شيء بعد',
            ORDER: 'ملخص',
            SUMMARY: 'الطلب',
            SUBTOTAL: 'المجموع الفرعي',
            SHIPPING: 'الشحن',
            TOTAL: 'الإجمالي',
            SELECT_SIZE: 'اختر المقاس',
            ADD_TO_CART: 'أضف إلى السلة',
            PRODUCT_POLICIES_ORIGINAL: 'منتجات أصلية 100%',
            PRODUCT_POLICIES_COD: 'الدفع عند الاستلام متاح',
            PRODUCT_POLICIES_RETURN: 'إرجاع سهل خلال 7 أيام',
            DESCRIPTION: 'الوصف',
            REVIEWS: 'المراجعات',
            NO_REVIEWS: 'لا توجد مراجعات بعد. كن أول من يراجع هذا المنتج!',
            QUICK_VIEW: 'عرض سريع',
            SALE: 'تخفيض',
            FREE_SHIPPING: 'شحن مجاني',
            VIEW_DETAILS: 'عرض التفاصيل',
            ADD: 'إضافة',
            RATING: 'التقييم',
            CLOSE: 'إغلاق',
            // Login & Auth
            SIGN_IN: 'تسجيل الدخول',
            SIGN_UP: 'إنشاء حساب',
            WELCOME_BACK: 'مرحبًا بعودتك',
            CREATE_ACCOUNT: 'إنشاء حساب',
            SIGN_IN_TO_ACCESS: 'سجّل الدخول للوصول إلى حسابك',
            JOIN_US: 'انضم إلينا للبدء',
            FULL_NAME: 'الاسم الكامل',
            EMAIL_ADDRESS: 'البريد الإلكتروني',
            PASSWORD: 'كلمة المرور',
            PROCESSING: 'جاري المعالجة...',
            DONT_HAVE_ACCOUNT: 'ليس لديك حساب؟',
            ALREADY_HAVE_ACCOUNT: 'لديك حساب بالفعل؟',
            FORGOT_PASSWORD: 'نسيت كلمة المرور؟',
            // Place Order & Checkout
            FIRST_NAME: 'الاسم الأول',
            LAST_NAME: 'اسم العائلة',
            EMAIL: 'البريد الإلكتروني',
            STREET_ADDRESS: 'عنوان الشارع',
            CITY: 'المدينة',
            STATE: 'المحافظة',
            ZIPCODE: 'الرمز البريدي',
            COUNTRY: 'الدولة',
            PHONE: 'الهاتف',
            PAYMENT: 'الدفع',
            METHOD: 'الطريقة',
            CASH_ON_DELIVERY: 'الدفع عند الاستلام',
            PLACE_ORDER: 'تأكيد الطلب',
            PROCESSING_ORDER: 'جاري تنفيذ الطلب...',
            FIRST_NAME_REQUIRED: 'الاسم الأول مطلوب',
            LAST_NAME_REQUIRED: 'اسم العائلة مطلوب',
            EMAIL_REQUIRED: 'البريد الإلكتروني مطلوب',
            EMAIL_INVALID: 'البريد الإلكتروني غير صالح',
            STREET_REQUIRED: 'عنوان الشارع مطلوب',
            CITY_REQUIRED: 'المدينة مطلوبة',
            ZIPCODE_REQUIRED: 'الرمز البريدي مطلوب',
            COUNTRY_REQUIRED: 'الدولة مطلوبة',
            PHONE_REQUIRED: 'رقم الهاتف مطلوب',
            // About & Contact
            ABOUT: 'حول',
            ABOUT_DESC1: 'وُلدت Forever من شغف بالابتكار ورغبة في تغيير طريقة تسوق الناس عبر الإنترنت. بدأت رحلتنا بفكرة بسيطة: توفير منصة يمكن للعملاء من خلالها اكتشاف واستكشاف وشراء مجموعة واسعة من المنتجات بسهولة من منازلهم.',
            ABOUT_DESC2: 'منذ تأسيسنا، عملنا بلا كلل على تنويع مجموعة منتجاتنا عالية الجودة لتناسب جميع الأذواق والاحتياجات. من الأزياء والجمال إلى الإلكترونيات واحتياجات المنزل، نقدم مجموعة واسعة من العلامات التجارية الموثوقة.',
            OUR_MISSION_TITLE: 'مهمتنا',
            OUR_MISSION_DESC: 'مهمتنا في Forever هي تمكين العملاء من الاختيار والراحة والثقة. نحن ملتزمون بتقديم تجربة تسوق سلسة تتجاوز التوقعات، من التصفح والطلب إلى التوصيل وما بعده.',
            WHY: 'لماذا',
            CHOOSE_US: 'تختارنا',
            QUALITY_ASSURANCE: 'ضمان الجودة',
            QUALITY_ASSURANCE_DESC: 'نختار وندقق كل منتج بعناية لضمان مطابقته لمعايير الجودة الصارمة لدينا.',
            CONVENIENCE: 'الراحة',
            CONVENIENCE_DESC: 'مع واجهتنا السهلة وعملية الطلب السلسة، أصبح التسوق أسهل من أي وقت مضى.',
            EXCEPTIONAL_CUSTOMER_SERVICE: 'خدمة عملاء استثنائية',
            EXCEPTIONAL_CUSTOMER_SERVICE_DESC: 'فريقنا من المحترفين المكرسين هنا لمساعدتك في كل خطوة، وضمان رضاك هو أولويتنا.',
            CONTACT_HEADER_DESC: 'يسعدنا التواصل معك! سواء كان لديك سؤال عن الميزات أو الأسعار أو أي شيء آخر، فريقنا جاهز للإجابة على جميع استفساراتك.',
            GET: 'تواصل',
            IN_TOUCH: 'معنا',
            CONTACT_CARD_DESC: 'تواصل معنا لأي استفسارات أو دعم أو حتى لإلقاء التحية! فريقنا دائمًا سعيد بمساعدتك.',
            CONTACT_ADDRESS: '123 شارع فوريفر، مدينة الأحلام، الدولة',
            NAME: 'الاسم',
            YOUR_NAME: 'اسمك',
            YOUR_EMAIL: 'بريدك الإلكتروني',
            MESSAGE: 'الرسالة',
            YOUR_MESSAGE: 'رسالتك',
            SEND_MESSAGE: 'إرسال الرسالة',
            CONTACT_THANK_YOU: 'شكرًا لتواصلك معنا! سنرد عليك قريبًا.',
            // Newsletter
            SUBSCRIBE_NOW: 'اشترك الآن واحصل على خصم 20%',
            SUBSCRIBE_DESC: 'انضم إلى نشرتنا الإخبارية للحصول على عروض حصرية وتحديثات والمزيد!',
            THANK_YOU: 'شكرًا لاشتراكك!',
            SUBSCRIBE: 'اشترك',
            ENTER_EMAIL: 'أدخل بريدك الإلكتروني',
            // Misc
            REMOVE_ITEM: 'إزالة العنصر',
            PRODUCT_DESCRIPTION_1: 'موقع التجارة الإلكترونية هو منصة عبر الإنترنت تسهل عملية بيع وشراء المنتجات أو الخدمات عبر الإنترنت. يعمل كسوق افتراضي حيث يمكن للشركات والأفراد عرض منتجاتهم والتفاعل مع العملاء وإجراء المعاملات دون الحاجة إلى وجود فعلي.',
            PRODUCT_DESCRIPTION_2: 'اكتسبت مواقع التجارة الإلكترونية شعبية كبيرة بسبب سهولة استخدامها وإمكانية الوصول إليها وانتشارها العالمي. عادةً ما تعرض المنتجات أو الخدمات مع أوصاف وصور وأسعار وتفاصيل متنوعة (مثل المقاسات والألوان).',
            RELATED_PRODUCTS: 'منتجات ذات صلة',
            RELATED_PRODUCTS_DESC: 'قد تعجبك هذه المنتجات أيضًا:',
            Men : 'رجال',
            Women : 'نساء',
            Kids : 'أطفال',
            Topwear : 'ملابس علوية',
            Bottomwear : 'ملابس سفلية',
            Winterwear : 'ملابس شتوية',
            INFORMATION: 'معلومات',
            
            // Add more keys as needed
        }
    };

    const t = (key) => translations[language][key] || key;

    const value = {
        products, currency, Delivery_Fee, Search,
         setSearch, ShowSearch, setShowSearch, scrollToTop,
          CartItems, addToCart, getCartCount, UbdateQuantity,
          getCartAmount,Navigate,
          language, setLanguage, direction, setDirection, toggleLanguage,
          t
    }



    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider