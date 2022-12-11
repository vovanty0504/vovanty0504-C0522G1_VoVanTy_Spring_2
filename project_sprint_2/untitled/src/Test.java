public class Test {
    public static void main(String[] args) {
        Short s1 = 100;
        Integer s2 = 200;
        Long s3 = (long) s1 + s2;
        String s4 = (Long.toString(s2 * s3));
        System.out.println(s4);

    }
}
